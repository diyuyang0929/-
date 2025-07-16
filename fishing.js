// 钓鱼模块 - 完整的JavaScript模块化解决方案
class FishingModule {
    constructor() {
        // 钓鱼相关变量
        this.fishingLevel = 1;
        this.fishingExp = 0;
        this.fishingTools = {
            rod: { name: '竹竿', level: 1, durability: 100, maxDurability: 100, catchRate: 0.3 },
            net: { name: '渔网', level: 1, durability: 50, maxDurability: 50, catchRate: 0.5 },
            bait: { name: '蚯蚓', count: 10, effect: 0.2 }
        };
        this.fishingSpots = {
            pond: { name: '小池塘', unlocked: true, fishTypes: ['carp', 'bass', 'catfish'], difficulty: 1 },
            river: { name: '河流', unlocked: false, fishTypes: ['trout', 'salmon', 'pike'], difficulty: 2 },
            lake: { name: '湖泊', unlocked: false, fishTypes: ['bass', 'perch', 'walleye'], difficulty: 3 },
            ocean: { name: '海洋', unlocked: false, fishTypes: ['tuna', 'mackerel', 'cod'], difficulty: 4 }
        };
        this.caughtFish = {
            carp: 0, bass: 0, catfish: 0, trout: 0, salmon: 0, pike: 0,
            perch: 0, walleye: 0, tuna: 0, mackerel: 0, cod: 0
        };
        this.fishInventory = [];
        this.currentSpot = 'pond';
        this.isFishing = false;
        this.fishingTimer = null;
        
        // 鱼类数据
        this.fishData = {
            carp: { name: '鲤鱼', rarity: 'common', basePrice: 15, exp: 10, icon: '🐟' },
            bass: { name: '鲈鱼', rarity: 'common', basePrice: 20, exp: 15, icon: '🐟' },
            catfish: { name: '鲶鱼', rarity: 'uncommon', basePrice: 25, exp: 20, icon: '🐟' },
            trout: { name: '鳟鱼', rarity: 'uncommon', basePrice: 30, exp: 25, icon: '🐟' },
            salmon: { name: '三文鱼', rarity: 'rare', basePrice: 50, exp: 40, icon: '🐟' },
            pike: { name: '梭子鱼', rarity: 'rare', basePrice: 45, exp: 35, icon: '🐟' },
            perch: { name: '鲈鱼', rarity: 'common', basePrice: 18, exp: 12, icon: '🐟' },
            walleye: { name: '白斑狗鱼', rarity: 'uncommon', basePrice: 35, exp: 30, icon: '🐟' },
            tuna: { name: '金枪鱼', rarity: 'epic', basePrice: 100, exp: 80, icon: '🐟' },
            mackerel: { name: '鲭鱼', rarity: 'rare', basePrice: 40, exp: 35, icon: '🐟' },
            cod: { name: '鳕鱼', rarity: 'rare', basePrice: 60, exp: 50, icon: '🐟' }
        };
        
        // 钓鱼工具商店
        this.fishingShop = {
            rods: [
                { id: 'bamboo_rod', name: '竹竿', price: 50, level: 1, catchRate: 0.3, durability: 100 },
                { id: 'wooden_rod', name: '木制钓竿', price: 150, level: 2, catchRate: 0.4, durability: 150 },
                { id: 'fiberglass_rod', name: '玻璃纤维钓竿', price: 300, level: 3, catchRate: 0.5, durability: 200 },
                { id: 'carbon_rod', name: '碳纤维钓竿', price: 600, level: 4, catchRate: 0.6, durability: 250 }
            ],
            nets: [
                { id: 'small_net', name: '小渔网', price: 100, level: 1, catchRate: 0.5, durability: 50 },
                { id: 'medium_net', name: '中型渔网', price: 250, level: 2, catchRate: 0.6, durability: 75 },
                { id: 'large_net', name: '大型渔网', price: 500, level: 3, catchRate: 0.7, durability: 100 }
            ],
            baits: [
                { id: 'worm', name: '蚯蚓', price: 5, effect: 0.2, count: 10 },
                { id: 'cricket', name: '蟋蟀', price: 8, effect: 0.3, count: 10 },
                { id: 'minnow', name: '小鱼苗', price: 15, effect: 0.4, count: 5 },
                { id: 'artificial_bait', name: '人工饵料', price: 20, effect: 0.5, count: 10 }
            ]
        };
        
        this.gameState = null; // 将在init时设置
    }

    // 初始化钓鱼模块
    init(containerId, gameState) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`容器 ${containerId} 不存在`);
            return;
        }
        
        // 设置游戏状态引用
        this.gameState = gameState;
        
        // 同步游戏状态中的钓鱼数据
        if (gameState) {
            this.fishingLevel = gameState.fishingLevel || this.fishingLevel;
            this.fishingExp = gameState.fishingExp || this.fishingExp;
            this.fishingTools = gameState.fishingTools || this.fishingTools;
            this.fishingSpots = gameState.fishingSpots || this.fishingSpots;
            this.caughtFish = gameState.caughtFish || this.caughtFish;
            this.fishInventory = gameState.fishInventory || this.fishInventory;
        }
        
        container.innerHTML = this.generateFishingHTML();
        this.bindEvents();
        this.updateDisplay();
        this.startFishingAnimation();
    }

    // 生成钓鱼HTML结构
    generateFishingHTML() {
        return `
            <div class="card-strong p-8">
                <h2 class="text-3xl subtitle-strong mb-6 border-b-2 border-blue-200 pb-2 flex items-center">
                    <i class="fas fa-fish mr-3"></i> 钓鱼系统
                </h2>
                
                <!-- 钓鱼统计 -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div class="text-3xl font-bold text-blue-600" id="fishing-level">${this.fishingLevel}</div>
                        <div class="text-sm text-gray-600">钓鱼等级</div>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div class="text-3xl font-bold text-green-600" id="fishing-exp">${this.fishingExp}</div>
                        <div class="text-sm text-gray-600">钓鱼经验</div>
                    </div>
                    <div class="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                        <div class="text-3xl font-bold text-yellow-600" id="bait-count">${this.fishingTools.bait.count}</div>
                        <div class="text-sm text-gray-600">饵料数量</div>
                    </div>
                    <div class="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <div class="text-3xl font-bold text-purple-600" id="total-fish">${this.getTotalFish()}</div>
                        <div class="text-sm text-gray-600">总鱼获</div>
                    </div>
                </div>

                <!-- 钓鱼管理按钮 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button id="start-fishing-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">
                        <i class="fas fa-fish mr-2"></i> 开始钓鱼
                    </button>
                    <button id="fishing-shop-btn" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">
                        <i class="fas fa-shopping-cart mr-2"></i> 钓鱼商店
                    </button>
                    <button id="sell-fish-btn" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">
                        <i class="fas fa-coins mr-2"></i> 出售鱼获
                    </button>
                </div>

                <!-- 钓鱼地点选择 -->
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-map-marker-alt mr-2"></i> 钓鱼地点
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button class="fishing-spot-btn bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold p-4 transition ${this.currentSpot === 'pond' ? 'ring-4 ring-blue-300' : ''}" data-spot="pond">
                            <div class="text-2xl mb-2">🌊</div>
                            <div class="font-bold">小池塘</div>
                            <div class="text-sm opacity-90">难度: 1</div>
                        </button>
                        <button class="fishing-spot-btn bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold p-4 transition ${this.currentSpot === 'river' ? 'ring-4 ring-green-300' : ''} ${!this.fishingSpots.river.unlocked ? 'opacity-50 cursor-not-allowed' : ''}" data-spot="river">
                            <div class="text-2xl mb-2">🏞️</div>
                            <div class="font-bold">河流</div>
                            <div class="text-sm opacity-90">难度: 2</div>
                        </button>
                        <button class="fishing-spot-btn bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold p-4 transition ${this.currentSpot === 'lake' ? 'ring-4 ring-purple-300' : ''} ${!this.fishingSpots.lake.unlocked ? 'opacity-50 cursor-not-allowed' : ''}" data-spot="lake">
                            <div class="text-2xl mb-2">🏔️</div>
                            <div class="font-bold">湖泊</div>
                            <div class="text-sm opacity-90">难度: 3</div>
                        </button>
                        <button class="fishing-spot-btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold p-4 transition ${this.currentSpot === 'ocean' ? 'ring-4 ring-indigo-300' : ''} ${!this.fishingSpots.ocean.unlocked ? 'opacity-50 cursor-not-allowed' : ''}" data-spot="ocean">
                            <div class="text-2xl mb-2">🌊</div>
                            <div class="font-bold">海洋</div>
                            <div class="text-sm opacity-90">难度: 4</div>
                        </button>
                    </div>
                </div>

                <!-- 钓鱼区域 -->
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-water mr-2"></i> 钓鱼区域
                    </h3>
                    <div id="fishing-area" class="bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg p-8 text-center relative overflow-hidden">
                        <div id="fishing-animation" class="text-6xl mb-4">🎣</div>
                        <div id="fishing-status" class="text-lg font-semibold text-gray-700">准备钓鱼</div>
                        <div id="fishing-progress" class="w-full bg-gray-200 rounded-full h-2 mt-4 hidden">
                            <div id="progress-bar" class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                        </div>
                        <div id="fish-caught" class="mt-4 hidden">
                            <div class="text-2xl mb-2">🐟</div>
                            <div class="font-bold text-green-600">钓到鱼了！</div>
                        </div>
                    </div>
                </div>

                <!-- 钓鱼工具状态 -->
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-tools mr-2"></i> 钓鱼工具
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-white rounded-lg p-4 border-2 border-gray-200">
                            <div class="flex items-center justify-between mb-2">
                                <span class="font-bold">钓竿</span>
                                <span class="text-sm text-gray-600">${this.fishingTools.rod.name}</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: ${(this.fishingTools.rod.durability / this.fishingTools.rod.maxDurability) * 100}%"></div>
                            </div>
                            <div class="text-xs text-gray-500 mt-1">耐久度: ${this.fishingTools.rod.durability}/${this.fishingTools.rod.maxDurability}</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 border-2 border-gray-200">
                            <div class="flex items-center justify-between mb-2">
                                <span class="font-bold">渔网</span>
                                <span class="text-sm text-gray-600">${this.fishingTools.net.name}</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-600 h-2 rounded-full" style="width: ${(this.fishingTools.net.durability / this.fishingTools.net.maxDurability) * 100}%"></div>
                            </div>
                            <div class="text-xs text-gray-500 mt-1">耐久度: ${this.fishingTools.net.durability}/${this.fishingTools.net.maxDurability}</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 border-2 border-gray-200">
                            <div class="flex items-center justify-between mb-2">
                                <span class="font-bold">饵料</span>
                                <span class="text-sm text-gray-600">${this.fishingTools.bait.name}</span>
                            </div>
                            <div class="text-lg font-bold text-yellow-600">${this.fishingTools.bait.count}</div>
                            <div class="text-xs text-gray-500">效果: +${this.fishingTools.bait.effect * 100}%</div>
                        </div>
                    </div>
                </div>

                <!-- 鱼获展示 -->
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-fish mr-2"></i> 鱼获展示
                    </h3>
                    <div id="fish-display" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <!-- 鱼获将通过JS动态生成 -->
                    </div>
                </div>
            </div>
        `;
    }

    // 绑定事件
    bindEvents() {
        // 开始钓鱼
        document.getElementById('start-fishing-btn')?.addEventListener('click', () => {
            this.startFishing();
        });

        // 钓鱼商店
        document.getElementById('fishing-shop-btn')?.addEventListener('click', () => {
            this.showFishingShop();
        });

        // 出售鱼获
        document.getElementById('sell-fish-btn')?.addEventListener('click', () => {
            this.sellAllFish();
        });

        // 钓鱼地点切换
        document.querySelectorAll('.fishing-spot-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const spot = e.target.closest('button').dataset.spot;
                this.switchFishingSpot(spot);
            });
        });
    }

    // 开始钓鱼
    startFishing() {
        if (this.isFishing) {
            this.showNotification('正在钓鱼中，请稍等...', 'warning');
            return;
        }

        if (this.fishingTools.bait.count <= 0) {
            this.showNotification('饵料不足！请先购买饵料', 'error');
            return;
        }

        this.isFishing = true;
        this.fishingTools.bait.count--;
        
        const statusEl = document.getElementById('fishing-status');
        const progressEl = document.getElementById('fishing-progress');
        const progressBarEl = document.getElementById('progress-bar');
        const animationEl = document.getElementById('fishing-animation');
        
        statusEl.textContent = '正在钓鱼...';
        progressEl.classList.remove('hidden');
        animationEl.textContent = '🎣';
        animationEl.classList.add('animate-bounce');
        
        // 钓鱼进度
        let progress = 0;
        const fishingTime = 3000 + Math.random() * 2000; // 3-5秒
        const progressInterval = setInterval(() => {
            progress += 2;
            progressBarEl.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                this.completeFishing();
            }
        }, fishingTime / 50);
        
        this.fishingTimer = setTimeout(() => {
            if (this.isFishing) {
                clearInterval(progressInterval);
                this.completeFishing();
            }
        }, fishingTime);
    }

    // 完成钓鱼
    completeFishing() {
        this.isFishing = false;
        
        const statusEl = document.getElementById('fishing-status');
        const progressEl = document.getElementById('fishing-progress');
        const animationEl = document.getElementById('fishing-animation');
        const fishCaughtEl = document.getElementById('fish-caught');
        
        // 计算钓鱼成功率
        const baseChance = this.fishingTools.rod.catchRate;
        const baitBonus = this.fishingTools.bait.effect;
        const levelBonus = this.fishingLevel * 0.05;
        const totalChance = Math.min(0.95, baseChance + baitBonus + levelBonus);
        
        if (Math.random() < totalChance) {
            // 钓到鱼
            const currentSpot = this.fishingSpots[this.currentSpot];
            const availableFish = currentSpot.fishTypes;
            const randomFish = availableFish[Math.floor(Math.random() * availableFish.length)];
            
            this.caughtFish[randomFish]++;
            this.addFishToInventory(randomFish);
            
            // 获得经验
            const expGained = this.fishData[randomFish].exp;
            this.gainExp(expGained);
            
            // 更新显示
            statusEl.textContent = `钓到了 ${this.fishData[randomFish].name}！`;
            animationEl.textContent = this.fishData[randomFish].icon;
            fishCaughtEl.classList.remove('hidden');
            
            this.showNotification(`钓到了 ${this.fishData[randomFish].name}！获得 ${expGained} 经验`, 'success');
            
            // 减少工具耐久度
            this.fishingTools.rod.durability = Math.max(0, this.fishingTools.rod.durability - 1);
            if (this.fishingTools.rod.durability <= 0) {
                this.showNotification('钓竿损坏了！请购买新的钓竿', 'warning');
            }
        } else {
            // 没钓到鱼
            statusEl.textContent = '没有钓到鱼...';
            animationEl.textContent = '💧';
            this.showNotification('这次没有钓到鱼，再试一次吧！', 'info');
        }
        
        // 重置显示
        setTimeout(() => {
            statusEl.textContent = '准备钓鱼';
            progressEl.classList.add('hidden');
            animationEl.textContent = '🎣';
            animationEl.classList.remove('animate-bounce');
            fishCaughtEl.classList.add('hidden');
            document.getElementById('progress-bar').style.width = '0%';
        }, 2000);
        
        this.updateDisplay();
        this.syncToGameState();
    }

    // 切换钓鱼地点
    switchFishingSpot(spot) {
        if (!this.fishingSpots[spot].unlocked) {
            this.showNotification('该钓鱼地点尚未解锁！', 'error');
            return;
        }
        
        this.currentSpot = spot;
        
        // 更新按钮状态
        document.querySelectorAll('.fishing-spot-btn').forEach(btn => {
            btn.classList.remove('ring-4', 'ring-blue-300', 'ring-green-300', 'ring-purple-300', 'ring-indigo-300');
        });
        document.querySelector(`[data-spot="${spot}"]`)?.classList.add('ring-4', 'ring-blue-300');
        
        this.showNotification(`切换到 ${this.fishingSpots[spot].name}`, 'info');
    }

    // 显示钓鱼商店
    showFishingShop() {
        const content = `
            <div class="space-y-6">
                <!-- 钓竿 -->
                <div>
                    <h3 class="text-lg font-bold mb-3 text-blue-600">钓竿</h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${this.fishingShop.rods.map(rod => `
                            <div class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                                 onclick="fishingModule.buyFishingTool('rod', '${rod.id}')">
                                <div class="font-bold">${rod.name}</div>
                                <div class="text-sm text-gray-600">等级: ${rod.level}</div>
                                <div class="text-sm text-gray-600">捕获率: ${rod.catchRate * 100}%</div>
                                <div class="text-sm text-gray-600">耐久度: ${rod.durability}</div>
                                <div class="font-bold text-green-600 mt-2">${rod.price}💰</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 渔网 -->
                <div>
                    <h3 class="text-lg font-bold mb-3 text-green-600">渔网</h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${this.fishingShop.nets.map(net => `
                            <div class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                                 onclick="fishingModule.buyFishingTool('net', '${net.id}')">
                                <div class="font-bold">${net.name}</div>
                                <div class="text-sm text-gray-600">等级: ${net.level}</div>
                                <div class="text-sm text-gray-600">捕获率: ${net.catchRate * 100}%</div>
                                <div class="text-sm text-gray-600">耐久度: ${net.durability}</div>
                                <div class="font-bold text-green-600 mt-2">${net.price}💰</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 饵料 -->
                <div>
                    <h3 class="text-lg font-bold mb-3 text-yellow-600">饵料</h3>
                    <div class="grid grid-cols-2 gap-4">
                        ${this.fishingShop.baits.map(bait => `
                            <div class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                                 onclick="fishingModule.buyFishingTool('bait', '${bait.id}')">
                                <div class="font-bold">${bait.name}</div>
                                <div class="text-sm text-gray-600">效果: +${bait.effect * 100}%</div>
                                <div class="text-sm text-gray-600">数量: ${bait.count}</div>
                                <div class="font-bold text-green-600 mt-2">${bait.price}💰</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.showModal('钓鱼商店', content);
    }

    // 购买钓鱼工具
    buyFishingTool(type, toolId) {
        let tool = null;
        
        if (type === 'rod') {
            tool = this.fishingShop.rods.find(r => r.id === toolId);
        } else if (type === 'net') {
            tool = this.fishingShop.nets.find(n => n.id === toolId);
        } else if (type === 'bait') {
            tool = this.fishingShop.baits.find(b => b.id === toolId);
        }
        
        if (!tool) {
            this.showNotification('工具不存在！', 'error');
            return;
        }
        
        if (this.gameState && this.gameState.money < tool.price) {
            this.showNotification('金币不足！', 'error');
            return;
        }
        
        if (this.gameState) {
            this.gameState.money -= tool.price;
        }
        
        if (type === 'rod') {
            this.fishingTools.rod = {
                name: tool.name,
                level: tool.level,
                durability: tool.durability,
                maxDurability: tool.durability,
                catchRate: tool.catchRate
            };
        } else if (type === 'net') {
            this.fishingTools.net = {
                name: tool.name,
                level: tool.level,
                durability: tool.durability,
                maxDurability: tool.durability,
                catchRate: tool.catchRate
            };
        } else if (type === 'bait') {
            this.fishingTools.bait.count += tool.count;
        }
        
        this.showNotification(`购买 ${tool.name} 成功！`, 'success');
        this.closeModal();
        this.updateDisplay();
        this.syncToGameState();
        
        if (typeof window.updateUI === 'function') {
            window.updateUI();
        }
    }

    // 出售所有鱼获
    sellAllFish() {
        let totalEarned = 0;
        let soldFish = [];
        
        Object.keys(this.caughtFish).forEach(fishType => {
            const count = this.caughtFish[fishType];
            if (count > 0) {
                const fishData = this.fishData[fishType];
                const price = fishData.basePrice;
                const earned = count * price;
                totalEarned += earned;
                soldFish.push(`${fishData.name} ×${count}`);
                this.caughtFish[fishType] = 0;
            }
        });
        
        if (totalEarned > 0) {
            if (this.gameState) {
                this.gameState.money += totalEarned;
            }
            this.showNotification(`出售成功！获得 ${totalEarned} 金币`, 'success');
            console.log('出售的鱼:', soldFish.join(', '));
            this.updateDisplay();
            this.syncToGameState();
            
            if (typeof window.updateUI === 'function') {
                window.updateUI();
            }
        } else {
            this.showNotification('没有鱼可以出售！', 'error');
        }
    }

    // 获得经验
    gainExp(exp) {
        this.fishingExp += exp;
        
        // 检查是否升级
        const expNeeded = this.fishingLevel * 100;
        if (this.fishingExp >= expNeeded) {
            this.fishingLevel++;
            this.fishingExp -= expNeeded;
            this.showNotification(`钓鱼等级提升到 ${this.fishingLevel}！`, 'success');
            
            // 解锁新的钓鱼地点
            this.checkUnlockSpots();
        }
    }

    // 检查解锁钓鱼地点
    checkUnlockSpots() {
        if (this.fishingLevel >= 2 && !this.fishingSpots.river.unlocked) {
            this.fishingSpots.river.unlocked = true;
            this.showNotification('解锁新钓鱼地点：河流！', 'success');
        }
        if (this.fishingLevel >= 4 && !this.fishingSpots.lake.unlocked) {
            this.fishingSpots.lake.unlocked = true;
            this.showNotification('解锁新钓鱼地点：湖泊！', 'success');
        }
        if (this.fishingLevel >= 6 && !this.fishingSpots.ocean.unlocked) {
            this.fishingSpots.ocean.unlocked = true;
            this.showNotification('解锁新钓鱼地点：海洋！', 'success');
        }
    }

    // 添加鱼到库存
    addFishToInventory(fishType) {
        const fish = {
            type: fishType,
            name: this.fishData[fishType].name,
            rarity: this.fishData[fishType].rarity,
            price: this.fishData[fishType].basePrice,
            icon: this.fishData[fishType].icon,
            caughtAt: new Date().toISOString()
        };
        
        this.fishInventory.push(fish);
        
        // 限制库存大小
        if (this.fishInventory.length > 100) {
            this.fishInventory = this.fishInventory.slice(-100);
        }
    }

    // 获取总鱼获数量
    getTotalFish() {
        return Object.values(this.caughtFish).reduce((sum, count) => sum + count, 0);
    }

    // 更新显示
    updateDisplay() {
        this.updateFishingStats();
        this.renderFishDisplay();
        this.updateFishingTools();
    }

    // 更新钓鱼统计
    updateFishingStats() {
        const levelEl = document.getElementById('fishing-level');
        const expEl = document.getElementById('fishing-exp');
        const baitEl = document.getElementById('bait-count');
        const totalEl = document.getElementById('total-fish');
        
        if (levelEl) levelEl.textContent = this.fishingLevel;
        if (expEl) expEl.textContent = this.fishingExp;
        if (baitEl) baitEl.textContent = this.fishingTools.bait.count;
        if (totalEl) totalEl.textContent = this.getTotalFish();
    }

    // 渲染鱼获展示
    renderFishDisplay() {
        const container = document.getElementById('fish-display');
        if (!container) return;
        
        const fishElements = Object.keys(this.fishData).map(fishType => {
            const count = this.caughtFish[fishType];
            const fishData = this.fishData[fishType];
            
            if (count === 0) return '';
            
            const rarityColors = {
                common: 'bg-gray-100 border-gray-300',
                uncommon: 'bg-green-100 border-green-300',
                rare: 'bg-blue-100 border-blue-300',
                epic: 'bg-purple-100 border-purple-300'
            };
            
            return `
                <div class="p-3 ${rarityColors[fishData.rarity]} rounded-lg border-2 text-center">
                    <div class="text-2xl mb-1">${fishData.icon}</div>
                    <div class="font-bold text-sm">${fishData.name}</div>
                    <div class="text-xs text-gray-600">数量: ${count}</div>
                    <div class="text-xs text-green-600">价值: ${fishData.basePrice}💰</div>
                </div>
            `;
        }).filter(el => el !== '');
        
        if (fishElements.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <div class="text-4xl mb-4 opacity-50">🎣</div>
                    <div class="text-gray-500">还没有钓到鱼，快去钓鱼吧！</div>
                </div>
            `;
        } else {
            container.innerHTML = fishElements.join('');
        }
    }

    // 更新钓鱼工具显示
    updateFishingTools() {
        // 更新钓竿耐久度
        const rodDurability = (this.fishingTools.rod.durability / this.fishingTools.rod.maxDurability) * 100;
        const rodProgressBar = document.querySelector('.bg-blue-600');
        if (rodProgressBar) {
            rodProgressBar.style.width = `${rodDurability}%`;
        }
        
        // 更新渔网耐久度
        const netDurability = (this.fishingTools.net.durability / this.fishingTools.net.maxDurability) * 100;
        const netProgressBar = document.querySelector('.bg-green-600');
        if (netProgressBar) {
            netProgressBar.style.width = `${netDurability}%`;
        }
    }

    // 启动钓鱼动画
    startFishingAnimation() {
        // 定期更新钓鱼动画
        setInterval(() => {
            if (!this.isFishing) {
                const animationEl = document.getElementById('fishing-animation');
                if (animationEl && animationEl.textContent === '🎣') {
                    animationEl.classList.add('animate-pulse');
                    setTimeout(() => {
                        animationEl.classList.remove('animate-pulse');
                    }, 1000);
                }
            }
        }, 3000);
    }

    // 同步数据到游戏状态
    syncToGameState() {
        if (!this.gameState) return;
        
        this.gameState.fishingLevel = this.fishingLevel;
        this.gameState.fishingExp = this.fishingExp;
        this.gameState.fishingTools = this.fishingTools;
        this.gameState.fishingSpots = this.fishingSpots;
        this.gameState.caughtFish = this.caughtFish;
        this.gameState.fishInventory = this.fishInventory;
    }

    // 显示通知（兼容主系统）
    showNotification(message, type = 'info') {
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }

    // 显示模态框
    showModal(title, content) {
        if (typeof window.showModal === 'function') {
            window.showModal(title, content);
        } else {
            console.log(`[MODAL] ${title}: ${content}`);
        }
    }

    // 关闭模态框
    closeModal() {
        if (typeof window.closeModal === 'function') {
            window.closeModal();
        }
    }
}

// 创建全局钓鱼模块实例
if (typeof window !== 'undefined') {
    window.fishingModule = new FishingModule();
} 
