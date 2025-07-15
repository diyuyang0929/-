// 农田管理模块
class FarmModule {
    constructor() {
        this.farmContainer = null;
        this.gameState = null;
        this.seeds = null;
        this.landImprovementLevels = [
            { level: 0, name: '普通土地', icon: '🟫', color: 'bg-amber-100', growthBonus: 1.0, yieldBonus: 1.0, description: '基础土地，无特殊效果' },
            { level: 1, name: '肥沃土地', icon: '🟤', color: 'bg-yellow-200', growthBonus: 1.15, yieldBonus: 1.1, cost: 100, description: '施肥改良，生长速度+15%，产量+10%' },
            { level: 2, name: '优质土地', icon: '🟢', color: 'bg-green-200', growthBonus: 1.3, yieldBonus: 1.25, cost: 200, description: '深度改良，生长速度+30%，产量+25%' },
            { level: 3, name: '完美土地', icon: '✨', color: 'bg-purple-200', growthBonus: 1.5, yieldBonus: 1.5, cost: 400, description: '极致改良，生长速度+50%，产量+50%' }
        ];
        this.fruitQualities = [
            { level: 0, name: '普通', icon: '🟫', color: 'bg-gray-100 border-gray-300', priceMultiplier: 1.0, description: '普通品质的水果', landRequirement: 0 },
            { level: 1, name: '优良', icon: '🟤', color: 'bg-green-100 border-green-300', priceMultiplier: 1.3, description: '优良品质的水果，售价+30%', landRequirement: 1 },
            { level: 2, name: '精品', icon: '🟢', color: 'bg-blue-100 border-blue-300', priceMultiplier: 1.6, description: '精品品质的水果，售价+60%', landRequirement: 2 },
            { level: 3, name: '完美', icon: '✨', color: 'bg-purple-100 border-purple-300', priceMultiplier: 2.0, description: '完美品质的水果，售价+100%', landRequirement: 3 }
        ];
    }

    // 初始化农田模块
    init(containerId, gameStateRef, seedsRef, weatherTypesRef) {
        this.farmContainer = document.getElementById(containerId);
        this.gameState = gameStateRef;
        this.seeds = seedsRef;
        this.weatherTypes = weatherTypesRef;
        
        if (!this.farmContainer) {
            console.error('农田容器未找到:', containerId);
            return;
        }

        this.render();
        this.startGrowthTimer();
    }

    // 渲染农田
    render() {
        if (!this.farmContainer || !this.gameState) return;
        
        this.farmContainer.innerHTML = '';
        
        // 确保farmData数组长度与plots一致
        while (this.gameState.farmData.length < this.gameState.plots) {
            this.gameState.farmData.push({
                state: 'empty',
                seedId: null,
                growth: null,
                progress: 0,
                growthTime: 0,
                plantedAt: null,
                lastWateredAt: null,
                pest: false,
                witherCountdown: 0,
                reinforced: false,
                drainageUpgraded: false
            });
        }

        for (let i = 0; i < this.gameState.plots; i++) {
            const plotData = this.gameState.farmData[i];
            const plot = document.createElement('div');
            
            // 获取土地改良等级和数据
            const landLevel = this.getLandImprovementLevel(i);
            const landData = this.getLandImprovementData(landLevel);
            
            // 根据土地等级设置背景色
            plot.className = `crop-plot ${landData.color} border-2 border-yellow-200 rounded-2xl aspect-square flex flex-col items-center justify-center p-4 cursor-pointer shadow-md hover:shadow-xl transition`;
            
            // 添加土地改良等级指示器
            const landIndicator = document.createElement('div');
            landIndicator.className = 'absolute top-1 left-1 text-xs px-1 py-0.5 bg-black bg-opacity-50 text-white rounded';
            landIndicator.innerHTML = `${landData.icon} ${landData.name}`;
            landIndicator.style.fontSize = '10px';
            plot.style.position = 'relative';
            plot.appendChild(landIndicator);
            
            // 根据地块状态设置不同的显示
            if (plotData.state === 'empty') {
                this.renderEmptyPlot(plot, landData, i);
            } else if (plotData.state === 'wasteland') {
                this.renderWastelandPlot(plot, i);
            } else if (plotData.state === 'planted') {
                this.renderPlantedPlot(plot, plotData, landData, i);
            }
            
            plot.setAttribute('data-plot-index', i);
            plot.addEventListener('click', () => this.handlePlotClick(i));
            this.farmContainer.appendChild(plot);
        }
        
        // 绑定事件
        this.bindEvents();
    }

    // 渲染空闲农田
    renderEmptyPlot(plot, landData, plotIndex) {
        const landIcon = landData.icon;
        plot.innerHTML += `
            <div class="text-5xl mb-2">${landIcon}</div>
            <p class="text-base text-center text-gray-600 font-semibold">空闲农田</p>
            <div class="w-full bg-gray-200 rounded-full h-2 hidden">
                <div class="progress-bar bg-green-600 h-2 rounded-full" style="width: 0%"></div>
            </div>
        `;
        
        // 添加土地改良按钮
        const landLevel = this.getLandImprovementLevel(plotIndex);
        if (landLevel < this.landImprovementLevels.length - 1) {
            const nextLevelData = this.getLandImprovementData(landLevel + 1);
            const upgradeBtn = document.createElement('button');
            upgradeBtn.className = 'land-upgrade-btn bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs mt-1';
            upgradeBtn.textContent = `升级土地 (${nextLevelData.cost}金币)`;
            upgradeBtn.setAttribute('data-plot-index', plotIndex);
            upgradeBtn.onclick = (e) => {
                e.stopPropagation();
                this.upgradeLandImprovement(plotIndex);
            };
            plot.appendChild(upgradeBtn);
        }
    }

    // 渲染荒地
    renderWastelandPlot(plot, plotIndex) {
        plot.innerHTML += `
            <div class="text-5xl mb-2">🌵</div>
            <p class="text-base text-center font-semibold text-red-800">荒地(需修复)</p>
            <button class="repair-btn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm mt-1" data-plot-index="${plotIndex}">
                修复 (50金币)
            </button>
        `;
    }

    // 渲染已种植的地块
    renderPlantedPlot(plot, plotData, landData, plotIndex) {
        const seed = this.getSeedById(plotData.seedId);
        if (!seed) {
            // 如果找不到种子数据，重置为空闲
            plotData.state = 'empty';
            plotData.seedId = null;
            plotData.growth = null;
            this.renderEmptyPlot(plot, landData, plotIndex);
            return;
        }

        plot.setAttribute('data-planted', seed.id);
        
        // 计算生长进度和成熟状态，应用土地改良加成
        if (plotData.plantedAt && plotData.growthTime) {
            const now = Date.now();
            const elapsed = (now - plotData.plantedAt) / 1000;
            if (plotData.growthTime) {
                const totalSeconds = (plotData.growthTime * 60) / landData.growthBonus;
                plotData.progress = elapsed;
                if (plotData.progress >= totalSeconds) {
                    plotData.growth = 'completed';
                    plotData.progress = totalSeconds;
                } else {
                    plotData.growth = 'growing';
                }
            }
        }
        
        plot.setAttribute('data-growth', plotData.growth);
        
        if (plotData.growth === 'completed') {
            this.renderMatureCrop(plot, seed);
        } else {
            this.renderGrowingCrop(plot, seed, plotData, landData, plotIndex);
        }
    }

    // 渲染成熟的作物
    renderMatureCrop(plot, seed) {
        plot.innerHTML += `
            <div class="text-5xl mb-2">${seed.icon}</div>
            <p class="text-base text-center font-semibold text-green-800">${seed.name}</p>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div class="progress-bar bg-yellow-500 h-2 rounded-full" style="width: 100%"></div>
            </div>
            <p class="text-base text-gray-500 mt-1">可以收获了!</p>
        `;
        plot.classList.add('animate-pulse');
    }

    // 渲染生长中的作物
    renderGrowingCrop(plot, seed, plotData, landData, plotIndex) {
        this.checkPlantProtection(plotIndex, plotData);
        
        const totalSeconds = (plotData.growthTime * 60) / landData.growthBonus;
        let percent = plotData.progress / totalSeconds * 100;
        if (percent >= 100) {
            percent = (Date.now() % 2000) / 2000 * 100;
        }
        
        plot.innerHTML += `
            <div class="text-5xl mb-2">${seed.icon}</div>
            <p class="text-base text-center font-semibold text-green-800">${seed.name}</p>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div class="progress-bar bg-green-600 h-2 rounded-full" style="width: ${percent}%"></div>
            </div>
            <p class="text-base text-gray-500 mt-1">成长中...</p>
        `;
        
        // 添加状态和操作按钮
        this.addPlotStatusButtons(plot, plotData, plotIndex);
    }

    // 添加地块状态和操作按钮
    addPlotStatusButtons(plot, plotData, plotIndex) {
        let statusHtml = '';
        
        if (plotData.pest) {
            statusHtml += '<span class="text-red-600 font-bold">病虫害</span> ';
            statusHtml += `<button class='pesticide-btn bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded text-xs mt-1' data-plot-index='${plotIndex}'>用农药(10金币)</button> `;
        }
        
        if (plotData.witherCountdown >= 3) {
            statusHtml += '<span class="text-gray-700 font-bold">已枯死</span> ';
        }
        
        // 浇水状态
        let wateredToday = false;
        if (plotData.lastWateredAt) {
            const last = new Date(plotData.lastWateredAt);
            const now = new Date();
            wateredToday = last.getFullYear() === now.getFullYear() && 
                         last.getMonth() === now.getMonth() && 
                         last.getDate() === now.getDate();
        }
        
        if (wateredToday) {
            statusHtml += `<button class='water-btn bg-gray-400 text-white px-2 py-1 rounded text-xs mt-1' data-plot-index='${plotIndex}' disabled>已浇水</button>`;
        } else {
            statusHtml += `<button class='water-btn bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs mt-1' data-plot-index='${plotIndex}'>浇水</button>`;
        }
        
        plot.innerHTML += `<div class='mt-2 text-center'>${statusHtml}</div>`;
    }

    // 绑定事件
    bindEvents() {
        setTimeout(() => {
            // 绑定农药按钮事件
            document.querySelectorAll('.pesticide-btn').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const idx = parseInt(btn.getAttribute('data-plot-index'));
                    this.usePesticide(idx);
                };
            });
            
            // 绑定浇水按钮事件
            document.querySelectorAll('.water-btn').forEach(btn => {
                if (btn.disabled) return;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const idx = parseInt(btn.getAttribute('data-plot-index'));
                    this.waterPlot(idx);
                };
            });
            
            // 绑定修复按钮事件
            document.querySelectorAll('.repair-btn').forEach(btn => {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    const idx = parseInt(btn.getAttribute('data-plot-index'));
                    this.repairPlot(idx);
                };
            });
        }, 0);
    }

    // 处理农田点击
    handlePlotClick(plotIndex) {
        const plot = document.querySelector(`[data-plot-index="${plotIndex}"]`);
        const plotData = this.gameState.farmData[plotIndex];

        if (plotData.state === 'empty') {
            if (this.gameState.currentSelectedSeed) {
                const seed = this.getSeedById(this.gameState.currentSelectedSeed);
                this.plantSeed(plotIndex, seed);
            } else {
                this.showNotification('请先选择一个种子!', 'error');
            }
        } else if (plotData.state === 'planted' && plotData.growth === 'completed') {
            this.harvestCrop(plotIndex);
        }
    }

    // 种植种子
    plantSeed(plotIndex, seed) {
        const plotData = this.gameState.farmData[plotIndex];

        // 10%概率种植失败，变成荒地
        if (Math.random() < 0.1) {
            plotData.state = 'wasteland';
            plotData.seedId = null;
            plotData.growth = null;
            plotData.progress = 0;
            plotData.growthTime = 0;
            
            this.showNotification('种植失败! 农田变成了荒地!', 'error');
            this.render();
            this.saveGameData();
            return;
        }

        // 计算生长时间（考虑天气、升级、保护设施等因素）
        const growthTime = this.calculateGrowthTime(seed);
        
        // 更新游戏状态
        plotData.state = 'planted';
        plotData.seedId = seed.id;
        plotData.growth = 'growing';
        plotData.progress = 0;
        plotData.growthTime = growthTime;
        plotData.plantedAt = Date.now();
        
        // 更新种子库存
        this.gameState.purchasedSeeds[seed.id]--;
        if (this.gameState.purchasedSeeds[seed.id] <= 0) {
            delete this.gameState.purchasedSeeds[seed.id];
            this.gameState.currentSelectedSeed = null;
        }
        
        this.showNotification(`已种植 ${seed.name}!`, 'success');
        this.updateTaskProgress('plant');
        this.render();
        this.saveGameData();
    }

    // 收获作物
    harvestCrop(plotIndex) {
        const plotData = this.gameState.farmData[plotIndex];
        
        if (plotData.state !== 'planted' || plotData.growth !== 'completed') {
            this.showNotification('收获失败：作物未成熟或状态异常', 'error');
            return;
        }
        
        if (plotData.witherCountdown >= 3) {
            this.showNotification('作物已枯死，无法收获', 'error');
            return;
        }
        
        const seed = this.getSeedById(plotData.seedId);
        if (!seed) {
            this.showNotification('收获失败：作物数据异常', 'error');
            return;
        }
        
        // 计算收获价格和品质
        const sellPrice = this.calculateSellPrice(seed, plotIndex, plotData);
        const fruitQuality = this.determineFruitQuality(plotIndex);
        const qualityData = this.getFruitQualityData(fruitQuality);
        
        // 更新游戏状态
        this.gameState.xp += seed.xp;
        this.addQualityFruitToInventory(seed.id, fruitQuality, 1);
        
        // 重置地块
        this.resetPlot(plotData);
        
        // 更新统计
        this.gameState.totalHarvested = (this.gameState.totalHarvested || 0) + 1;
        if (fruitQuality === 3) {
            this.gameState.perfectHarvests = (this.gameState.perfectHarvests || 0) + 1;
        }
        
        this.updateTaskProgress('harvest');
        this.showNotification(`收获 ${qualityData.name}${seed.name}! +${seed.xp}经验，仓库+1`, 'success');
        this.render();
        this.saveGameData();
    }

    // 计算生长时间
    calculateGrowthTime(seed) {
        const weather = this.weatherTypes.find(w => w.id === this.gameState.weather);
        
        let growthTime = seed.growTime *
                       (1 - (this.gameState.upgrades.watering * 0.1)) *
                       (1 / weather.effect.growth);

        // 应用温室升级减少天气影响
        if (this.gameState.upgrades.greenhouse > 0) {
            const weatherImpactReduction = 0.5;
            const adjustedGrowthEffect = weather.effect.growth + (1 - weather.effect.growth) * weatherImpactReduction;
            growthTime = seed.growTime * (1 - (this.gameState.upgrades.watering * 0.1)) * (1 / adjustedGrowthEffect);
        }
        
        // 应用植物保护设施效果
        let protectionBonus = 1.0;
        if ((this.gameState.decors.greenhouse || 0) > 0) protectionBonus *= 1.2;
        if ((this.gameState.decors.irrigation_system || 0) > 0) protectionBonus *= 1.1;
        if ((this.gameState.decors.shade_net || 0) > 0) protectionBonus *= 1.05;
        
        return growthTime / protectionBonus;
    }

    // 计算出售价格
    calculateSellPrice(seed, plotIndex, plotData) {
        const weather = this.weatherTypes.find(w => w.id === this.gameState.weather);
        const landLevel = this.getLandImprovementLevel(plotIndex);
        const landData = this.getLandImprovementData(landLevel);
        
        let sellPrice = Math.floor(seed.sellPrice * (1 + (this.gameState.upgrades.quality * 0.15)) * landData.yieldBonus);
        
        // 应用天气影响
        if (weather) {
            if (weather.id === 'rainbow') sellPrice = Math.floor(sellPrice * 1.5);
            else if (weather.id === 'sunny' && (!plotData.lastWateredAt || Date.now() - plotData.lastWateredAt > 24*60*60*1000)) sellPrice = Math.floor(sellPrice * 0.5);
            else if (weather.id === 'stormy') sellPrice = Math.floor(sellPrice * 0.8);
            else if (weather.id === 'drought') sellPrice = Math.floor(sellPrice * 0.7);
            else if (weather.id === 'typhoon') sellPrice = Math.floor(sellPrice * 0.75);
            else if (weather.id === 'sandstorm') sellPrice = Math.floor(sellPrice * 0.6);
        }
        
        // 应用保护设施加成
        let protectionPriceBonus = 1.0;
        if ((this.gameState.decors.greenhouse || 0) > 0) protectionPriceBonus *= 1.15;
        if ((this.gameState.decors.irrigation_system || 0) > 0) protectionPriceBonus *= 1.1;
        if ((this.gameState.decors.shade_net || 0) > 0) protectionPriceBonus *= 1.05;
        if ((this.gameState.decors.wind_break || 0) > 0) protectionPriceBonus *= 1.08;
        if ((this.gameState.decors.frost_protection || 0) > 0) protectionPriceBonus *= 1.12;
        
        sellPrice = Math.floor(sellPrice * protectionPriceBonus);
        
        // 病虫害减产
        if (plotData.pest) sellPrice = Math.floor(sellPrice * 0.7);
        
        return sellPrice;
    }

    // 使用农药
    usePesticide(plotIndex) {
        const plot = this.gameState.farmData[plotIndex];
        if (this.gameState.money < 10) {
            this.showNotification('金币不足，无法使用农药', 'error');
            return;
        }
        this.gameState.money -= 10;
        plot.pest = false;
        this.render();
        this.saveGameData();
        this.showNotification('病虫害已清除！', 'success');
    }

    // 浇水
    waterPlot(plotIndex) {
        const plot = this.gameState.farmData[plotIndex];
        plot.lastWateredAt = Date.now();
        plot.witherCountdown = 0;
        this.render();
        this.saveGameData();
        this.showNotification('浇水成功！', 'success');
    }

    // 修复荒地
    repairPlot(plotIndex) {
        if (this.gameState.money >= 50) {
            this.gameState.money -= 50;
            const plotData = this.gameState.farmData[plotIndex];
            this.resetPlot(plotData);
            this.showNotification('农田修复成功!', 'success');
            this.render();
            this.saveGameData();
        } else {
            this.showNotification('金币不足!', 'error');
        }
    }

    // 重置地块
    resetPlot(plotData) {
        plotData.state = 'empty';
        plotData.seedId = null;
        plotData.growth = null;
        plotData.progress = 0;
        plotData.growthTime = 0;
        plotData.lastWateredAt = null;
        plotData.witherCountdown = 0;
        plotData.pest = false;
    }

    // 升级土地改良
    upgradeLandImprovement(plotIndex) {
        const currentLevel = this.getLandImprovementLevel(plotIndex);
        const nextLevel = currentLevel + 1;
        
        if (nextLevel >= this.landImprovementLevels.length) {
            this.showNotification('土地已达到最高等级！', 'info');
            return;
        }
        
        const nextLevelData = this.getLandImprovementData(nextLevel);
        if (this.gameState.money < nextLevelData.cost) {
            this.showNotification(`金币不足！需要 ${nextLevelData.cost} 金币`, 'error');
            return;
        }
        
        this.gameState.money -= nextLevelData.cost;
        this.setLandImprovementLevel(plotIndex, nextLevel);
        
        this.showNotification(`土地改良成功！升级到 ${nextLevelData.name}`, 'success');
        this.render();
        this.saveGameData();
    }

    // 检查植物保护
    checkPlantProtection(plotIndex, plotData) {
        const currentWeather = this.gameState.weather;
        let protectionApplied = false;
        let protectionMessage = '';
        
        // 检查各种保护设施
        if (currentWeather === 'drought' && (this.gameState.decors.irrigation_system || 0) > 0) {
            plotData.lastWateredAt = Date.now();
            plotData.witherCountdown = 0;
            protectionApplied = true;
            protectionMessage = '灌溉系统自动浇水';
        }
        
        if ((currentWeather === 'drought' || currentWeather === 'stormy' || currentWeather === 'typhoon' || currentWeather === 'sandstorm') && 
            (this.gameState.decors.greenhouse || 0) > 0) {
            plotData.weatherProtection = true;
            protectionApplied = true;
            protectionMessage += protectionMessage ? '，温室大棚保护' : '温室大棚保护';
        }
        
        if (plotData.pest && (this.gameState.decors.pest_control || 0) > 0) {
            plotData.pest = false;
            protectionApplied = true;
            protectionMessage += protectionMessage ? '，虫害防治系统清除虫害' : '虫害防治系统清除虫害';
        }
        
        if (protectionApplied) {
            this.showNotification(`植物保护设施激活：${protectionMessage}`, 'success');
        }
        
        return protectionApplied;
    }

    // 启动生长定时器
    startGrowthTimer() {
        setInterval(() => {
            this.updateGrowthProgress();
        }, 1000);
    }

    // 更新生长进度
    updateGrowthProgress() {
        if (!this.gameState || !this.gameState.farmData) return;
        
        let hasChanges = false;
        
        this.gameState.farmData.forEach((plotData, index) => {
            if (plotData.state === 'planted' && plotData.plantedAt && plotData.growthTime) {
                const now = Date.now();
                const elapsed = (now - plotData.plantedAt) / 1000;
                
                // 计算事件影响
                let timeMultiplier = 1;
                if (plotData.timeSpeedMultiplier) timeMultiplier = plotData.timeSpeedMultiplier;
                if (plotData.growthSpeedMultiplier) timeMultiplier *= plotData.growthSpeedMultiplier;
                
                const adjustedElapsed = elapsed * timeMultiplier;
                plotData.progress = adjustedElapsed;
                
                const totalSeconds = plotData.growthTime * 60;
                if (plotData.progress >= totalSeconds && plotData.growth !== 'completed') {
                    plotData.growth = 'completed';
                    plotData.progress = totalSeconds;
                    hasChanges = true;
                } else if (plotData.progress < totalSeconds) {
                    plotData.growth = 'growing';
                }
            }
        });
        
        if (hasChanges) {
            this.render();
        }
    }

    // 工具函数
    getSeedById(id) {
        return this.seeds.find(seed => seed.id === id);
    }

    getLandImprovementLevel(plotIndex) {
        if (!this.gameState.regionLandImprovements[this.gameState.currentRegion]) {
            return 0;
        }
        return this.gameState.regionLandImprovements[this.gameState.currentRegion][plotIndex] || 0;
    }

    setLandImprovementLevel(plotIndex, level) {
        if (!this.gameState.regionLandImprovements[this.gameState.currentRegion]) {
            this.gameState.regionLandImprovements[this.gameState.currentRegion] = {};
        }
        this.gameState.regionLandImprovements[this.gameState.currentRegion][plotIndex] = level;
    }

    getLandImprovementData(level) {
        return this.landImprovementLevels.find(l => l.level === level) || this.landImprovementLevels[0];
    }

    determineFruitQuality(plotIndex) {
        const landLevel = this.getLandImprovementLevel(plotIndex);
        const random = Math.random();
        
        if (landLevel === 0) return 0;
        else if (landLevel === 1) return random < 0.5 ? 0 : 1;
        else if (landLevel === 2) {
            if (random < 0.33) return 0;
            else if (random < 0.67) return 1;
            else return 2;
        } else if (landLevel === 3) {
            if (random < 0.33) return 1;
            else if (random < 0.67) return 2;
            else return 3;
        }
        return 0;
    }

    getFruitQualityData(level) {
        return this.fruitQualities.find(q => q.level === level) || this.fruitQualities[0];
    }

    addQualityFruitToInventory(seedId, quality, count = 1) {
        if (!this.gameState.qualityInventory[seedId]) {
            this.gameState.qualityInventory[seedId] = { 0: 0, 1: 0, 2: 0, 3: 0 };
        }
        this.gameState.qualityInventory[seedId][quality] = (this.gameState.qualityInventory[seedId][quality] || 0) + count;
    }

    // 外部接口函数（需要在主文件中定义）
    showNotification(message, type) {
        if (window.showNotification) {
            window.showNotification(message, type);
        }
    }

    updateTaskProgress(type, amount) {
        if (window.updateTaskProgress) {
            window.updateTaskProgress(type, amount);
        }
    }

    saveGameData() {
        if (window.saveGameData) {
            window.saveGameData();
        }
    }
}

// 创建全局农田模块实例
window.farmModule = new FarmModule(); 
