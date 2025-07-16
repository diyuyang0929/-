// 牧场模块 - 完整的JavaScript模块化解决方案
class RanchModule {
    constructor() {
        // 牧场相关变量
        this.animals = { chicken: 0, cow: 0, sheep: 0, pig: 0, duck: 0, goat: 0, rabbit: 0, horse: 0 };
        this.animalHealth = { chicken: 100, cow: 100, sheep: 100, pig: 100, duck: 100, goat: 100, rabbit: 100, horse: 100 };
        this.animalFeed = 5;
        this.animalProducts = { egg: 0, milk: 0, wool: 0, pork: 0, duck_egg: 0, goat_milk: 0, rabbit_fur: 0, horse_manure: 0 };
        this.happiness = 0;
        this.currentArea = 'chicken';
        
        // 新增：动物应对天气系统
        this.animalShelter = { chicken: false, cow: false, sheep: false, pig: false, duck: false, goat: false, rabbit: false, horse: false };
        this.animalWaterSupply = { chicken: 100, cow: 100, sheep: 100, pig: 100, duck: 100, goat: 100, rabbit: 100, horse: 100 };
        this.animalStress = { chicken: 0, cow: 0, sheep: 0, pig: 0, duck: 0, goat: 0, rabbit: 0, horse: 0 };
        this.animalInjuries = { chicken: [], cow: [], sheep: [], pig: [], duck: [], goat: [], rabbit: [], horse: [] };
        
        // 牧场环境系统
        this.ranchEnvironment = {
            soundEnabled: false,
            timeOfDay: 'day',
            season: 'spring',
            
            // 时间系统
            timeSystem: {
                day: { icon: '🕐', title: '白天', mood: '😊 动物们很活跃' },
                evening: { icon: '🌅', title: '傍晚', mood: '😌 动物们在休息' },
                night: { icon: '🌙', title: '夜晚', mood: '😴 动物们在睡觉' }
            },
            
            // 季节系统
            seasons: {
                spring: { icon: '🌸', title: '春季' },
                summer: { icon: '☀️', title: '夏季' },
                autumn: { icon: '🍂', title: '秋季' },
                winter: { icon: '❄️', title: '冬季' }
            },
            
            // 动物叫声
            animalSounds: {
                chicken: ['咯咯', '咯咯咯'],
                cow: ['哞~', '哞哞'],
                sheep: ['咩~', '咩咩'],
                pig: ['哼哼', '哼哼哼'],
                duck: ['嘎嘎', '嘎嘎嘎'],
                goat: ['咩咩', '咩~'],
                rabbit: ['...', '(无声)'],
                horse: ['嘶~', '嘶嘶']
            },
            
            // 天气对牧场的全面影响
            weatherEffects: {
                sunny: {
                    icon: '☀️',
                    title: '晴天',
                    effect: 'sunny-effect',
                    animalEffects: {
                        benefits: ['产出效率+20%', '健康度缓慢恢复', '动物心情愉悦', '饲料效果提升'],
                        drawbacks: ['水分消耗增加', '需要更多饮水', '中暑风险', '饲料消耗增加'],
                        productionBonus: 1.2,
                        healthDecayModifier: 0.8,
                        waterNeed: 1.5,
                        shelterNeed: false,
                        feedConsumptionMultiplier: 1.3,
                        feedEffectivenessMultiplier: 1.2,
                        stressReduction: 0.5,
                        happinessBonus: 1.1,
                        specialActions: ['提供遮阳', '增加饮水', '防暑降温']
                    },
                    ranchEffects: {
                        feedPriceMultiplier: 0.9,
                        productPriceMultiplier: 1.1,
                        animalPriceMultiplier: 1.05,
                        facilityEffectiveness: 1.2,
                        maintenanceCost: 0.8
                    }
                },
                rainy: {
                    icon: '🌧️',
                    title: '雨天',
                    effect: 'rainy-effect',
                    animalEffects: {
                        benefits: ['自动补充水分', '清洁环境', '降低疾病风险', '饲料吸收更好'],
                        drawbacks: ['产出效率-10%', '容易感冒', '泥泞环境', '饲料容易发霉'],
                        productionBonus: 0.9,
                        healthDecayModifier: 1.1,
                        diseaseResistance: 1.2,
                        shelterNeed: true,
                        feedConsumptionMultiplier: 0.9,
                        feedEffectivenessMultiplier: 1.1,
                        stressReduction: 1.2,
                        happinessBonus: 0.95,
                        specialActions: ['搭建雨棚', '保持干燥', '预防感冒']
                    },
                    ranchEffects: {
                        feedPriceMultiplier: 1.1,
                        productPriceMultiplier: 0.95,
                        animalPriceMultiplier: 0.98,
                        facilityEffectiveness: 0.9,
                        maintenanceCost: 1.2
                    }
                },
                stormy: {
                    icon: '⛈️',
                    title: '暴雨',
                    effect: 'stormy-effect',
                    animalEffects: {
                        benefits: ['充足水源', '环境清洁'],
                        drawbacks: ['产出停止', '健康度快速下降', '动物恐慌', '饲料损失'],
                        productionBonus: 0,
                        healthDecayModifier: 2.0,
                        stressLevel: 'high',
                        shelterNeed: true,
                        feedConsumptionMultiplier: 0.5,
                        feedEffectivenessMultiplier: 0.7,
                        stressReduction: 2.0,
                        happinessBonus: 0.7,
                        specialActions: ['紧急避难', '安抚动物', '加固设施']
                    },
                    ranchEffects: {
                        feedPriceMultiplier: 1.3,
                        productPriceMultiplier: 0.8,
                        animalPriceMultiplier: 0.9,
                        facilityEffectiveness: 0.7,
                        maintenanceCost: 1.5
                    }
                },
                drought: {
                    icon: '🔥',
                    title: '干旱',
                    effect: 'drought-effect',
                    animalEffects: {
                        benefits: ['干燥环境减少细菌'],
                        drawbacks: ['严重缺水', '产出减半', '健康度快速下降', '饲料需求增加'],
                        productionBonus: 0.5,
                        healthDecayModifier: 2.5,
                        waterNeed: 3.0,
                        shelterNeed: false,
                        feedConsumptionMultiplier: 1.5,
                        feedEffectivenessMultiplier: 0.8,
                        stressReduction: 1.8,
                        happinessBonus: 0.8,
                        specialActions: ['紧急供水', '降温措施', '减少活动']
                    },
                    ranchEffects: {
                        feedPriceMultiplier: 1.4,
                        productPriceMultiplier: 1.2,
                        animalPriceMultiplier: 0.95,
                        facilityEffectiveness: 0.8,
                        maintenanceCost: 1.3
                    }
                },
                typhoon: {
                    icon: '🌀',
                    title: '台风',
                    effect: 'typhoon-effect',
                    animalEffects: {
                        benefits: ['台风过后空气清新'],
                        drawbacks: ['动物受惊', '产出停止', '可能受伤', '设施损坏'],
                        productionBonus: 0,
                        healthDecayModifier: 1.8,
                        injuryRisk: 0.1,
                        shelterNeed: true,
                        feedConsumptionMultiplier: 0.3,
                        feedEffectivenessMultiplier: 0.6,
                        stressReduction: 2.5,
                        happinessBonus: 0.6,
                        specialActions: ['紧急避难', '加固围栏', '医疗准备']
                    },
                    ranchEffects: {
                        feedPriceMultiplier: 1.5,
                        productPriceMultiplier: 0.7,
                        animalPriceMultiplier: 0.85,
                        facilityEffectiveness: 0.6,
                        maintenanceCost: 2.0
                    }
                },
                rainbow: {
                    icon: '🌈',
                    title: '彩虹天',
                    effect: 'rainbow-effect',
                    animalEffects: {
                        benefits: ['动物心情极佳', '产出品质提升', '健康度恢复', '饲料效果翻倍'],
                        drawbacks: [],
                        productionBonus: 1.5,
                        healthDecayModifier: 0.5,
                        qualityBonus: 1.5,
                        shelterNeed: false,
                        feedConsumptionMultiplier: 0.8,
                        feedEffectivenessMultiplier: 2.0,
                        stressReduction: 0.3,
                        happinessBonus: 1.5,
                        specialActions: ['户外活动', '增加互动', '享受时光']
                    },
                    ranchEffects: {
                        feedPriceMultiplier: 0.8,
                        productPriceMultiplier: 1.3,
                        animalPriceMultiplier: 1.15,
                        facilityEffectiveness: 1.4,
                        maintenanceCost: 0.7
                    }
                },
                sandstorm: {
                    icon: '🌪️',
                    title: '沙尘暴',
                    effect: 'sandstorm-effect',
                    animalEffects: {
                        benefits: [],
                        drawbacks: ['呼吸困难', '产出停止', '健康度下降', '视野受阻', '饲料污染'],
                        productionBonus: 0,
                        healthDecayModifier: 2.2,
                        respiratoryIssues: true,
                        shelterNeed: true,
                        feedConsumptionMultiplier: 0.4,
                        feedEffectivenessMultiplier: 0.5,
                        stressReduction: 2.2,
                        happinessBonus: 0.5,
                        specialActions: ['紧急避难', '防护措施', '医疗护理']
                    },
                    ranchEffects: {
                        feedPriceMultiplier: 1.6,
                        productPriceMultiplier: 0.6,
                        animalPriceMultiplier: 0.8,
                        facilityEffectiveness: 0.5,
                        maintenanceCost: 1.8
                    }
                }
            }
        };
        
        this.gameState = null; // 将在init时设置
    }

    // 初始化牧场模块
    init(containerId, gameState) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`容器 ${containerId} 不存在`);
            return;
        }
        
        // 设置游戏状态引用
        this.gameState = gameState;
        
        // 同步游戏状态中的牧场数据
        if (gameState) {
            this.animals = gameState.animals || this.animals;
            this.animalHealth = gameState.animalHealth || this.animalHealth;
            this.animalFeed = gameState.animalFeed || this.animalFeed;
            this.animalProducts = gameState.animalProducts || this.animalProducts;
            this.happiness = gameState.happiness || this.happiness;
            this.animalShelter = gameState.animalShelter || this.animalShelter;
            this.animalWaterSupply = gameState.animalWaterSupply || this.animalWaterSupply;
            this.animalStress = gameState.animalStress || this.animalStress;
            this.animalInjuries = gameState.animalInjuries || this.animalInjuries;
        }
        
        console.log('牧场模块初始化 - 健康值:', JSON.stringify(this.animalHealth));
        
        container.innerHTML = this.generateRanchHTML();
        this.bindEvents();
        this.updateDisplay();
        this.initRanchEnvironment();
        this.startTimeSystem();
        this.startAnimalAnimation();
    }

    // 生成牧场HTML结构
    generateRanchHTML() {
        return `
            <div class="card-strong p-8">
                <h2 class="text-3xl subtitle-strong mb-6 border-b-2 border-green-200 pb-2 flex items-center">
                    <i class="fas fa-warehouse mr-3"></i> 我的牧场
                </h2>
                
                <!-- 牧场统计 -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div class="text-3xl font-bold text-blue-600" id="total-animals">0</div>
                        <div class="text-sm text-gray-600">总动物数</div>
                    </div>
                    <div class="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div class="text-3xl font-bold text-green-600" id="avg-health">100%</div>
                        <div class="text-sm text-gray-600">平均健康度</div>
                    </div>
                    <div class="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                        <div class="text-3xl font-bold text-yellow-600" id="feed-count">5</div>
                        <div class="text-sm text-gray-600">饲料数量</div>
                    </div>
                    <div class="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <div class="text-3xl font-bold text-purple-600" id="happiness-value">0</div>
                        <div class="text-sm text-gray-600">幸福值</div>
                    </div>
                </div>

                <!-- 牧场管理按钮 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button id="buy-feed-btn" class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">
                        <i class="fas fa-shopping-cart mr-2"></i> 购买饲料 (10金币/包)
                    </button>
                    <button id="feed-animals-btn" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">
                        <i class="fas fa-apple-alt mr-2"></i> 喂养全部动物
                    </button>
                    <button id="sell-all-products-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition">
                        <i class="fas fa-coins mr-2"></i> 一键出售所有副产品
                    </button>
                </div>



                <!-- 动物区域选择 -->
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-map mr-2"></i> 动物区域
                    </h3>
                    <div class="overflow-x-auto" style="padding: 0; margin: 0;">
                        <div class="animal-area-buttons mb-4" style="gap: 12px; margin: 0; padding: 0;">
                            <button class="animal-area-btn bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold active" data-area="chicken" style="margin: 0; padding: 8px 12px; min-width: 110px; max-width: 110px;">
                                <span class="text-xl mr-2">🥚</span> 鸡圈
                            </button>
                            <button class="animal-area-btn bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold" data-area="cow" style="margin: 0; padding: 8px 12px; min-width: 110px; max-width: 110px;">
                                <span class="text-xl mr-2">🥛</span> 牛棚
                            </button>
                            <button class="animal-area-btn bg-white hover:bg-gray-100 text-gray-800 rounded-lg font-semibold" data-area="sheep" style="margin: 0; padding: 8px 12px; min-width: 110px; max-width: 110px; border: 2px solid #d1d5db;">
                                <span class="text-xl mr-2">🧶</span> 羊圈
                            </button>
                            <button class="animal-area-btn bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold" data-area="pig" style="margin: 0; padding: 8px 12px; min-width: 110px; max-width: 110px;">
                                <span class="text-xl mr-2">🥩</span> 猪圈
                            </button>
                            <button class="animal-area-btn bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold" data-area="duck" style="margin: 0; padding: 8px 12px; min-width: 110px; max-width: 110px;">
                                <span class="text-xl mr-2">🥚</span> 鸭园
                            </button>
                            <button class="animal-area-btn bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold" data-area="goat" style="margin: 0; padding: 8px 12px; min-width: 110px; max-width: 110px;">
                                <span class="text-xl mr-2">🥛</span> 山羊圈
                            </button>
                            <button class="animal-area-btn bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold" data-area="rabbit" style="margin: 0; padding: 8px 12px; min-width: 110px; max-width: 110px;">
                                <span class="text-xl mr-2">🧶</span> 兔园
                            </button>
                            <button class="animal-area-btn bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold" data-area="horse" style="margin: 0; padding: 8px 12px; min-width: 110px; max-width: 110px;">
                                <span class="text-xl mr-2">💩</span> 马厩
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 动物区域详情 -->
                <div id="animal-area-detail" class="mb-8">
                    <!-- 区域详情内容 -->
                </div>



                <!-- 栅栏状态 -->
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-shield-alt mr-2"></i> 栅栏保护
                    </h3>
                    <div id="fence-status" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <!-- 栅栏状态将通过JS动态生成 -->
                    </div>
                </div>
            </div>
        `;
    }

    // 绑定事件
    bindEvents() {
        // 购买饲料
        document.getElementById('buy-feed-btn')?.addEventListener('click', () => {
            this.buyFeed();
        });

        // 喂养全部动物
        document.getElementById('feed-animals-btn')?.addEventListener('click', () => {
            this.feedAllAnimals();
        });

        // 出售所有副产品
        document.getElementById('sell-all-products-btn')?.addEventListener('click', () => {
            this.sellAllProducts();
        });

        // 动物区域切换
        document.querySelectorAll('.animal-area-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const area = e.target.closest('button').dataset.area;
                this.switchArea(area);
            });
        });
    }

    // 购买饲料
    buyFeed() {
        // 获取当前天气对饲料价格的影响
        const currentWeather = this.gameState ? this.ranchEnvironment.weatherEffects[this.gameState.weather] : null;
        const basePrice = 10;
        const priceMultiplier = currentWeather?.ranchEffects?.feedPriceMultiplier || 1.0;
        const actualPrice = Math.round(basePrice * priceMultiplier);
        
        if (this.gameState && this.gameState.money >= actualPrice) {
            this.gameState.money -= actualPrice;
            this.gameState.animalFeed = (this.gameState.animalFeed || 0) + 1;
            this.animalFeed = this.gameState.animalFeed;
            
            let message = `购买饲料成功！花费${actualPrice}金币`;
            if (priceMultiplier !== 1.0) {
                const change = priceMultiplier > 1 ? '上涨' : '下降';
                const percent = Math.abs((priceMultiplier - 1) * 100);
                message += ` (天气影响：价格${change}${percent.toFixed(0)}%)`;
            }
            
            this.showNotification(message, 'success');
            
            // 更新按钮文本显示当前价格
            const buyFeedBtn = document.getElementById('buy-feed-btn');
            if (buyFeedBtn) {
                buyFeedBtn.innerHTML = `<i class="fas fa-shopping-cart mr-2"></i> 购买饲料 (${actualPrice}金币/包)`;
            }
            
            // 只更新饲料数量显示，不重新计算健康值
            const feedCountEl = document.getElementById('feed-count');
            if (feedCountEl) feedCountEl.textContent = this.animalFeed;
            this.syncToGameState();
            if (typeof window.updateUI === 'function') {
                window.updateUI();
            }
        } else {
            this.showNotification(`金币不足！需要 ${actualPrice} 金币`, 'error');
        }
    }

    // 喂养全部动物
    feedAllAnimals() {
        const totalAnimals = Object.values(this.animals).reduce((sum, count) => sum + count, 0);
        if (totalAnimals === 0) {
            this.showNotification('没有动物需要喂养！', 'error');
            return;
        }
        if (this.animalFeed < totalAnimals) {
            this.showNotification('饲料不足！', 'error');
            return;
        }
        
        console.log('喂养前健康值:', JSON.stringify(this.animalHealth));
        
        let healthChanges = [];
        Object.keys(this.animals).forEach(animalType => {
            if (this.animals[animalType] > 0) {
                const oldHealth = this.animalHealth[animalType] || 100;
                // 一键喂养直接恢复满健康值
                this.animalHealth[animalType] = 100;
                if (this.gameState) {
                    this.gameState.animalHealth[animalType] = this.animalHealth[animalType];
                }
                healthChanges.push(`${this.getAnimalName(animalType)}: ${oldHealth} → 100`);
            }
        });
        this.animalFeed -= totalAnimals;
        if (this.gameState) {
            this.gameState.animalFeed = this.animalFeed;
        }
        
        console.log('喂养后健康值:', JSON.stringify(this.animalHealth));
        console.log('游戏状态健康值:', JSON.stringify(this.gameState?.animalHealth));
        
        this.showNotification(`成功喂养了${totalAnimals}只动物！所有动物健康值恢复满值！`, 'success');
        console.log('健康度变化详情:', healthChanges.join(', '));
        
        // 强制同步到游戏状态
        this.syncToGameState();
        
        // 更新显示
        this.updateDisplay();
        
        // 验证更新后的状态
        setTimeout(() => {
            console.log('更新后健康值:', JSON.stringify(this.animalHealth));
            console.log('更新后游戏状态健康值:', JSON.stringify(this.gameState?.animalHealth));
        }, 100);
    }

    // 出售所有副产品
    sellAllProducts() {
        // 获取当前天气对产品价格的影响
        const currentWeather = this.gameState ? this.ranchEnvironment.weatherEffects[this.gameState.weather] : null;
        const priceMultiplier = currentWeather?.ranchEffects?.productPriceMultiplier || 1.0;
        
        let totalEarned = 0;
        let baseTotal = 0;
        const productPrices = {
            egg: 5, milk: 8, wool: 12, pork: 15,
            duck_egg: 6, goat_milk: 10, rabbit_fur: 20, horse_manure: 3
        };

        Object.keys(this.animalProducts).forEach(product => {
            const count = this.animalProducts[product];
            if (count > 0) {
                const basePrice = count * (productPrices[product] || 1);
                const actualPrice = Math.round(basePrice * priceMultiplier);
                baseTotal += basePrice;
                totalEarned += actualPrice;
                this.animalProducts[product] = 0;
                if (this.gameState) {
                    this.gameState.animalProducts[product] = 0;
                }
            }
        });

        if (totalEarned > 0) {
            if (this.gameState) {
                this.gameState.money += totalEarned;
            }
            
            let message = `出售成功！获得${totalEarned}金币`;
            if (priceMultiplier !== 1.0) {
                const change = priceMultiplier > 1 ? '上涨' : '下降';
                const percent = Math.abs((priceMultiplier - 1) * 100);
                message += ` (天气影响：价格${change}${percent.toFixed(0)}%)`;
            }
            
            this.showNotification(message, 'success');
            this.updateDisplay();
            this.syncToGameState();
            if (typeof window.updateUI === 'function') {
                window.updateUI();
            }
        } else {
            this.showNotification('没有副产品可以出售！', 'error');
        }
    }

    // 渲染动物商店
    renderAnimalShop() {
        const shop = document.getElementById('animal-shop');
        if (!shop) return;

        const animalShopData = [
            { id: 'chicken', name: '鸡', price: 60, desc: '产蛋', icon: '🐔', rarity: 'common' },
            { id: 'cow', name: '牛', price: 200, desc: '产奶', icon: '🐄', rarity: 'common' },
            { id: 'sheep', name: '羊', price: 120, desc: '产羊毛', icon: '🐑', rarity: 'common' },
            { id: 'pig', name: '猪', price: 150, desc: '产猪肉', icon: '🐷', rarity: 'uncommon' },
            { id: 'duck', name: '鸭子', price: 80, desc: '产鸭蛋', icon: '🦆', rarity: 'common' },
            { id: 'goat', name: '山羊', price: 180, desc: '产羊奶', icon: '🐐', rarity: 'uncommon' },
            { id: 'rabbit', name: '兔子', price: 300, desc: '产兔毛', icon: '🐰', rarity: 'rare' },
            { id: 'horse', name: '马', price: 500, desc: '产马粪肥', icon: '🐎', rarity: 'epic' }
        ];
        
        const rarityColors = {
            common: 'border-gray-300 bg-white',
            uncommon: 'border-green-400 bg-green-50',
            rare: 'border-blue-400 bg-blue-50',
            epic: 'border-purple-400 bg-purple-50'
        };
        
        shop.innerHTML = animalShopData.map(animal => `
            <div class="p-4 border-2 ${rarityColors[animal.rarity]} rounded-lg hover:shadow-lg transition-all cursor-pointer"
                 onclick="ranchModule.buyAnimal('${animal.id}', ${animal.price})">
                <div class="text-4xl mb-2 text-center">${animal.icon}</div>
                <div class="text-lg font-bold text-center">${animal.name}</div>
                <div class="text-sm text-gray-600 text-center mb-2">${animal.desc}</div>
                <div class="text-lg font-bold text-green-600 text-center">${animal.price}💰</div>
            </div>
        `).join('');
    }

    // 购买动物
    buyAnimal(animalId, price) {
        // 获取当前天气对动物价格的影响
        const currentWeather = this.gameState ? this.ranchEnvironment.weatherEffects[this.gameState.weather] : null;
        const priceMultiplier = currentWeather?.ranchEffects?.animalPriceMultiplier || 1.0;
        const actualPrice = Math.round(price * priceMultiplier);
        
        if (this.gameState && this.gameState.money < actualPrice) {
            this.showNotification(`金币不足！需要 ${actualPrice} 金币`, 'error');
            return;
        }
        
        if (this.gameState) {
            this.gameState.money -= actualPrice;
        }
        this.animals[animalId] = (this.animals[animalId] || 0) + 1;
        if (this.gameState) {
            this.gameState.animals[animalId] = this.animals[animalId];
        }
        
        let message = `购买${this.getAnimalName(animalId)}成功！花费${actualPrice}金币`;
        if (priceMultiplier !== 1.0) {
            const change = priceMultiplier > 1 ? '上涨' : '下降';
            const percent = Math.abs((priceMultiplier - 1) * 100);
            message += ` (天气影响：价格${change}${percent.toFixed(0)}%)`;
        }
        
        this.showNotification(message, 'success');
        this.updateDisplay();
        this.syncToGameState();
        if (typeof window.updateUI === 'function') {
            window.updateUI();
        }
        // 更新我的动物区域
        if (typeof window.renderMyAnimals === 'function') {
            window.renderMyAnimals();
        }
    }

    // 喂食动物
    feedAnimal(animalId) {
        if (this.animalFeed <= 0) {
            this.showNotification('饲料不足！', 'error');
            return;
        }
        
        if (!this.animals[animalId] || this.animals[animalId] <= 0) {
            this.showNotification(`你没有${this.getAnimalName(animalId)}`, 'error');
            return;
        }
        
        const oldHealth = this.animalHealth[animalId] || 100;
        this.animalFeed--;
        // 单个喂养也恢复满健康值
        this.animalHealth[animalId] = 100;
        
        if (this.gameState) {
            this.gameState.animalFeed = this.animalFeed;
            this.gameState.animalHealth[animalId] = this.animalHealth[animalId];
        }
        
        // 显示更详细的通知，包括基础健康值和综合健康值
        const baseHealth = this.animalHealth[animalId];
        const weatherHealth = this.calculateWeatherAffectedHealth(animalId);
        const finalHealth = Math.max(0, Math.min(100, baseHealth + weatherHealth));
        
        let healthChangeText = `基础健康度: ${Number(oldHealth).toFixed(2)} → 100.00`;
        if (weatherHealth !== 0) {
            healthChangeText += ` (天气影响: ${weatherHealth > 0 ? '+' : ''}${Number(weatherHealth).toFixed(2)}, 综合: ${Number(finalHealth).toFixed(2)})`;
        } else {
            healthChangeText += ` (综合: ${Number(finalHealth).toFixed(2)})`;
        }
        
        this.showNotification(`喂食${this.getAnimalName(animalId)}成功！健康值恢复满值！${healthChangeText}`, 'success');
        
        this.updateDisplay();
        this.syncToGameState();
    }

    // 使用指定数量饲料喂养动物
    feedAnimalWithFeed(animalId, feedAmount) {
        if (this.animalFeed < feedAmount) {
            this.showNotification(`饲料不足！需要 ${feedAmount} 包饲料，当前只有 ${this.animalFeed} 包`, 'error');
            return;
        }
        
        if (!this.animals[animalId] || this.animals[animalId] <= 0) {
            this.showNotification(`你没有${this.getAnimalName(animalId)}`, 'error');
            return;
        }
        
        const oldHealth = this.animalHealth[animalId] || 100;
        const oldFeed = this.animalFeed;
        
        // 计算健康值提升
        let healthIncrease = 0;
        let healthBonus = 0;
        
        // 基础健康值提升（每包饲料提升20点健康值）
        healthIncrease = Math.min(100 - oldHealth, feedAmount * 20);
        this.animalHealth[animalId] = Math.min(100, oldHealth + healthIncrease);
        
        // 额外健康值奖励（使用多包饲料时有额外奖励）
        if (feedAmount >= 3) {
            healthBonus = Math.min(100 - this.animalHealth[animalId], 10);
            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + healthBonus);
        }
        
        // 消耗饲料
        this.animalFeed -= feedAmount;
        
        // 更新游戏状态
        if (this.gameState) {
            this.gameState.animalFeed = this.animalFeed;
            this.gameState.animalHealth[animalId] = this.animalHealth[animalId];
        }
        
        // 调试日志
        console.log(`喂养${this.getAnimalName(animalId)}后，饲料数量: ${this.animalFeed}, 游戏状态饲料: ${this.gameState?.animalFeed}`);
        
        // 计算综合健康值
        const baseHealth = this.animalHealth[animalId];
        const weatherHealth = this.calculateWeatherAffectedHealth(animalId);
        const finalHealth = Math.max(0, Math.min(100, baseHealth + weatherHealth));
        
        // 生成通知消息
        let message = `使用 ${feedAmount} 包饲料喂养${this.getAnimalName(animalId)}！`;
        message += `\n基础健康度: ${Number(oldHealth).toFixed(2)} → ${Number(baseHealth).toFixed(2)}`;
        
        if (healthBonus > 0) {
            message += ` (额外奖励: +${Number(healthBonus).toFixed(2)})`;
        }
        
        if (weatherHealth !== 0) {
            message += `\n天气影响: ${weatherHealth > 0 ? '+' : ''}${Number(weatherHealth).toFixed(2)}`;
        }
        
        message += `\n综合健康度: ${Number(finalHealth).toFixed(2)}%`;
        message += `\n剩余饲料: ${oldFeed} → ${this.animalFeed}`;
        
        this.showNotification(message, 'success');
        
        // 强制更新牧场区域的饲料显示
        const feedCountEl = document.getElementById('feed-count');
        if (feedCountEl) {
            feedCountEl.textContent = this.animalFeed;
        }
        
        this.updateDisplay();
        this.syncToGameState();
        
        // 确保UI同步更新
        if (typeof window.updateUI === 'function') {
            window.updateUI();
        }
        
        // 如果使用了多包饲料，显示特殊效果
        if (feedAmount >= 3) {
            setTimeout(() => {
                this.showNotification(`🎉 ${this.getAnimalName(animalId)}因为饱餐一顿，心情变好了！`, 'info');
            }, 1000);
        }
    }

    // 使用自定义数量饲料喂养动物
    feedAnimalWithCustomAmount(animalId) {
        const inputElement = document.querySelector(`input[data-animal-id="${animalId}"]`);
        if (!inputElement) {
            this.showNotification('找不到输入框！', 'error');
            return;
        }
        
        const feedAmount = parseInt(inputElement.value);
        if (isNaN(feedAmount) || feedAmount < 1 || feedAmount > 10) {
            this.showNotification('请输入1-10之间的有效数量！', 'error');
            return;
        }
        
        this.feedAnimalWithFeed(animalId, feedAmount);
    }



    // 使用动物道具
    useAnimalItem(animalId, itemId, effect, value) {
        console.log('useAnimalItem called', animalId, itemId, effect, value);
        const animalName = this.getAnimalName(animalId);
        
        if (!this.animals[animalId] || this.animals[animalId] <= 0) {
            this.showNotification(`你没有${animalName}`, 'error');
            return;
        }
        
        // 检查道具库存
        if (!this.gameState || !this.gameState.items || (this.gameState.items[itemId] || 0) <= 0) {
            this.showNotification(`没有足够的${this.getItemName(itemId)}！`, 'error');
            return;
        }
        
        // 消耗道具
        this.gameState.items[itemId]--;
        
        // 根据效果类型执行相应操作
        let effectMessage = '';
        
        switch (effect) {
            case 'health':
                const oldHealth = this.animalHealth[animalId] || 100;
                this.animalHealth[animalId] = Math.min(100, oldHealth + value);
                effectMessage = `健康度: ${Number(oldHealth).toFixed(2)} → ${Number(this.animalHealth[animalId]).toFixed(2)}`;
                break;
                
            case 'stress':
                const oldStress = this.animalStress[animalId] || 0;
                this.animalStress[animalId] = Math.max(0, oldStress + value);
                effectMessage = `压力值: ${Number(oldStress).toFixed(2)} → ${Number(this.animalStress[animalId]).toFixed(2)}`;
                break;
                
            case 'water':
                const oldWater = this.animalWaterSupply[animalId] || 100;
                this.animalWaterSupply[animalId] = Math.min(100, oldWater + value);
                effectMessage = `水分: ${Number(oldWater).toFixed(2)} → ${Number(this.animalWaterSupply[animalId]).toFixed(2)}`;
                break;
                
            case 'healing':
                const oldHealth2 = this.animalHealth[animalId] || 100;
                this.animalHealth[animalId] = Math.min(100, oldHealth2 + value);
                // 治疗伤病
                if (this.animalInjuries[animalId] && this.animalInjuries[animalId].length > 0) {
                    this.animalInjuries[animalId] = [];
                    effectMessage = `伤病痊愈！健康度: ${Number(oldHealth2).toFixed(2)} → ${Number(this.animalHealth[animalId]).toFixed(2)}`;
                } else {
                    effectMessage = `健康度: ${Number(oldHealth2).toFixed(2)} → ${Number(this.animalHealth[animalId]).toFixed(2)}`;
                }
                break;
                
            case 'happiness':
                const oldStress2 = this.animalStress[animalId] || 0;
                this.animalStress[animalId] = Math.max(0, oldStress2 - Math.abs(value));
                effectMessage = `心情提升！压力值: ${Number(oldStress2).toFixed(2)} → ${Number(this.animalStress[animalId]).toFixed(2)}`;
                break;
                
            case 'growth':
                const oldHealth3 = this.animalHealth[animalId] || 100;
                this.animalHealth[animalId] = Math.min(100, oldHealth3 + value);
                const oldWater2 = this.animalWaterSupply[animalId] || 100;
                this.animalWaterSupply[animalId] = Math.min(100, oldWater2 + value);
                effectMessage = `生长加速！健康度+${value}, 水分+${value}`;
                break;
                
            default:
                effectMessage = '效果未知';
        }
        
        // 同步到游戏状态
            if (this.gameState) {
                this.gameState.animalHealth[animalId] = this.animalHealth[animalId];
            this.gameState.animalStress[animalId] = this.animalStress[animalId];
            this.gameState.animalWaterSupply[animalId] = this.animalWaterSupply[animalId];
            this.gameState.animalInjuries[animalId] = this.animalInjuries[animalId];
        }
        
        this.showNotification(`${animalName}使用了${this.getItemName(itemId)}！${effectMessage}`, 'success');
        
        this.closeModal();
        this.updateDisplay();
        this.syncToGameState();
        
        // 更新UI
        if (typeof window.updateUI === 'function') {
            window.updateUI();
        }
    }
    
    // 获取道具名称
    getItemName(itemId) {
        const itemNames = {
            'vitamin_pill': '维生素丸',
            'stress_relief_pill': '安抚药丸',
            'water_supplement': '水分补充剂',
            'healing_ointment': '治疗药膏',
            'happiness_treat': '快乐零食',
            'growth_hormone': '生长激素'
        };
        return itemNames[itemId] || itemId;
    }

    // 切换区域
    switchArea(area) {
        this.currentArea = area;
        
        // 更新按钮状态
        document.querySelectorAll('.animal-area-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-area="${area}"]`)?.classList.add('active');
        
        // 渲染区域详情
        this.renderAreaDetail(area);
    }

    // 渲染区域详情
    renderAreaDetail(area) {
        const container = document.getElementById('animal-area-detail');
        if (!container) return;

        const areaData = {
            'chicken': { name: '鸡舍', icon: '🥚', bgColor: 'bg-yellow-50', product: 'egg', animalIcon: '🐔' },
            'cow': { name: '牛棚', icon: '🥛', bgColor: 'bg-amber-50', product: 'milk', animalIcon: '🐄' },
            'sheep': { name: '羊圈', icon: '🧶', bgColor: 'bg-white', product: 'wool', animalIcon: '🐑' },
            'pig': { name: '猪圈', icon: '🥩', bgColor: 'bg-pink-50', product: 'pork', animalIcon: '🐷' },
            'duck': { name: '鸭园', icon: '🥚', bgColor: 'bg-blue-50', product: 'duck_egg', animalIcon: '🦆' },
            'goat': { name: '山羊圈', icon: '🥛', bgColor: 'bg-orange-50', product: 'goat_milk', animalIcon: '🐐' },
            'rabbit': { name: '兔园', icon: '🧶', bgColor: 'bg-purple-50', product: 'rabbit_fur', animalIcon: '🐰' },
            'horse': { name: '马厩', icon: '💩', bgColor: 'bg-red-50', product: 'horse_manure', animalIcon: '🐎' }
        };

        const currentAreaData = areaData[area];
        if (!currentAreaData) return;

        const count = this.animals[area] || 0;
        const products = this.animalProducts[currentAreaData.product] || 0;

        container.innerHTML = `
            <div class="${currentAreaData.bgColor} p-6 rounded-lg border-2 border-gray-200">
                <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <span class="text-3xl mr-2">${currentAreaData.icon}</span> ${currentAreaData.name}
                </h3>
                
                ${count > 0 ? `
                    <!-- 动物图标显示 -->
                    <div class="text-center py-6">
                        <div class="text-8xl mb-4">${currentAreaData.animalIcon}</div>
                        <div class="text-lg font-semibold text-gray-700 mb-4">${this.getAnimalName(area)} ×${count}</div>
                        
                        <!-- 健康值显示 -->
                        <div class="bg-white rounded-lg p-4 border-2 border-green-200 mb-4">
                            <div class="text-lg font-bold text-green-600 mb-2">健康状态</div>
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-600">基础健康:</span>
                                    <span class="font-semibold text-blue-600">${Number(this.animalHealth[area] || 100).toFixed(2)}%</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">天气影响:</span>
                                    <span class="font-semibold ${this.calculateWeatherAffectedHealth(area) > 0 ? 'text-green-600' : 'text-red-600'}">${this.calculateWeatherAffectedHealth(area) > 0 ? '+' : ''}${Number(this.calculateWeatherAffectedHealth(area)).toFixed(2)}</span>
                                </div>
                                <div class="col-span-2">
                                    <span class="text-gray-600">综合健康:</span>
                                    <span class="font-semibold ${Math.max(0, Math.min(100, (this.animalHealth[area] || 100) + this.calculateWeatherAffectedHealth(area))) > 50 ? 'text-green-600' : 'text-red-600'}">${Number(Math.max(0, Math.min(100, (this.animalHealth[area] || 100) + this.calculateWeatherAffectedHealth(area)))).toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 详细状态显示 -->
                        <div class="bg-white rounded-lg p-4 border-2 border-blue-200 mb-4">
                            <div class="text-lg font-bold text-blue-600 mb-2">详细状态</div>
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-600">压力值:</span>
                                    <span class="font-semibold ${(this.animalStress[area] || 0) > 50 ? 'text-red-600' : (this.animalStress[area] || 0) > 20 ? 'text-yellow-600' : 'text-green-600'}">${Number(this.animalStress[area] || 0).toFixed(2)}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">水分:</span>
                                    <span class="font-semibold ${(this.animalWaterSupply[area] || 100) < 30 ? 'text-red-600' : (this.animalWaterSupply[area] || 100) < 60 ? 'text-yellow-600' : 'text-green-600'}">${Number(this.animalWaterSupply[area] || 100).toFixed(2)}%</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">庇护:</span>
                                    <span class="font-semibold ${this.animalShelter[area] ? 'text-green-600' : 'text-red-600'}">${this.animalShelter[area] ? '✓ 有' : '✗ 无'}</span>
                                </div>
                                <div>
                                    <span class="text-gray-600">伤病:</span>
                                    <span class="font-semibold ${(this.animalInjuries[area] || []).length > 0 ? 'text-red-600' : 'text-green-600'}">${(this.animalInjuries[area] || []).length > 0 ? `${(this.animalInjuries[area] || []).length}个` : '无'}</span>
                                </div>
                            </div>
                            ${(this.animalInjuries[area] || []).length > 0 ? `
                                <div class="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
                                    <strong>伤病详情:</strong> ${(this.animalInjuries[area] || []).join(', ')}
                                </div>
                            ` : ''}
                        </div>
                        
                        <!-- 副产品显示 -->
                        <div class="bg-white rounded-lg p-4 border-2 border-orange-200">
                            <div class="text-2xl font-bold text-orange-600">${products}</div>
                            <div class="text-sm text-gray-600">${this.getProductName(currentAreaData.product)}</div>
                        </div>
                    </div>
                ` : `
                    <!-- 没有动物时的提示 -->
                    <div class="text-center py-8">
                        <div class="text-8xl mb-4 opacity-50">${currentAreaData.animalIcon}</div>
                        <div class="text-gray-500 text-lg">这个区域还没有${this.getAnimalName(area)}</div>
                    </div>
                `}
                
                <div class="text-center">
                    <p class="text-gray-600">${this.getAreaDescription(area)}</p>
                </div>
            </div>
        `;
    }

    // 获取区域描述
    getAreaDescription(area) {
        const descriptions = {
            chicken: '温馨的鸡舍，适合饲养鸡群产蛋',
            cow: '宽敞的牛棚，为奶牛提供舒适环境',
            sheep: '安全的羊圈，保护羊群免受风雨',
            pig: '干净的猪圈，保持猪群健康',
            duck: '清洁的鸭园，靠近水源方便鸭子生活',
            goat: '山坡上的羊圈，适合山羊攀爬',
            rabbit: '温暖的兔园，为兔子提供安全环境',
            horse: '宽敞的马厩，让马匹自由活动'
        };
        return descriptions[area] || '这里是动物们的家';
    }

    // 更新所有显示
    updateDisplay() {
        // 从游戏状态同步最新数据
        if (this.gameState) {
            this.animalHealth = this.gameState.animalHealth || this.animalHealth;
            this.animals = this.gameState.animals || this.animals;
            this.animalFeed = this.gameState.animalFeed || this.animalFeed;
        }
        
        this.updateRanchStats();
        this.renderAreaDetail(this.currentArea);
        this.updateRanchWeather(); // 更新天气显示
        this.renderFenceStatus(); // 更新栅栏状态
    }

    // 更新牧场统计
    updateRanchStats() {
        const totalAnimals = Object.values(this.animals).reduce((sum, count) => sum + count, 0);
        
        // 计算综合健康度（考虑天气影响）
        let totalHealth = 0;
        let animalCount = 0;
        
        Object.keys(this.animals).forEach(animalId => {
            const count = this.animals[animalId] || 0;
            if (count > 0) {
                const baseHealth = this.animalHealth[animalId] || 100;
                const weatherHealth = this.calculateWeatherAffectedHealth(animalId);
                const finalHealth = Math.max(0, Math.min(100, baseHealth + weatherHealth));
                totalHealth += finalHealth * count;
                animalCount += count;
            }
        });
        
        const avgHealth = animalCount > 0 ? Math.round(totalHealth / animalCount) : 100;
        
        const totalAnimalsEl = document.getElementById('total-animals');
        const avgHealthEl = document.getElementById('avg-health');
        const feedCountEl = document.getElementById('feed-count');
        const happinessEl = document.getElementById('happiness-value');
        
        if (totalAnimalsEl) totalAnimalsEl.textContent = totalAnimals;
        if (avgHealthEl) avgHealthEl.textContent = `${Number(avgHealth).toFixed(2)}%`;
        if (feedCountEl) {
            feedCountEl.textContent = this.animalFeed;
            console.log(`更新饲料显示: ${this.animalFeed}`);
        }
        if (happinessEl) happinessEl.textContent = `${this.happiness}%`;
    }

    // 启动动物动画系统
    startAnimalAnimation() {
        // 定期更新动物动画（每10秒随机改变动物的动画）
        setInterval(() => {
            const animalElements = document.querySelectorAll('.ranch-animal');
            animalElements.forEach(element => {
                const animations = ['animal-walk', 'animal-bounce', 'animal-sway', 'animal-breathe'];
                const currentClasses = element.className.split(' ');
                
                // 移除旧的动画类
                animations.forEach(anim => {
                    element.classList.remove(anim);
                });
                
                // 添加新的随机动画
                const newAnimation = animations[Math.floor(Math.random() * animations.length)];
                element.classList.add(newAnimation);
                
                // 随机改变动画延迟
                element.style.animationDelay = Math.random() * 3 + 's';
            });
        }, 10000); // 每10秒更新一次动画
    }

    // 初始化牧场环境控制
    initRanchEnvironment() {
        const soundBtn = document.getElementById('ranch-sound-btn');
        
        if (soundBtn) {
            soundBtn.onclick = () => {
                this.ranchEnvironment.soundEnabled = !this.ranchEnvironment.soundEnabled;
                const soundIcon = document.getElementById('sound-icon');
                const soundText = document.getElementById('sound-text');
                
                if (this.ranchEnvironment.soundEnabled) {
                    soundIcon.textContent = '🔊';
                    soundText.textContent = '音效开';
                    soundBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                    soundBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
                    this.showNotification('牧场音效已开启！', 'success');
                    this.playRanchSound();
                } else {
                    soundIcon.textContent = '🔇';
                    soundText.textContent = '音效关';
                    soundBtn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                    soundBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                    this.showNotification('牧场音效已关闭', 'info');
                }
            };
        }
        
        // 初始化天气显示
        this.updateRanchWeather();
    }

    // 播放牧场音效
    playRanchSound() {
        if (!this.ranchEnvironment.soundEnabled) return;
        
        const animals = ['chicken', 'cow', 'sheep', 'pig', 'duck', 'goat', 'rabbit', 'horse'];
        const availableAnimals = animals.filter(animal => (this.animals[animal] || 0) > 0);
        
        if (availableAnimals.length > 0) {
            const randomAnimal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
            const sounds = this.ranchEnvironment.animalSounds[randomAnimal];
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
            
            // 显示音效提示
            const soundNotification = document.createElement('div');
            soundNotification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold z-50 animate-pulse';
            soundNotification.innerHTML = `🔊 ${this.getAnimalName(randomAnimal)}: ${randomSound}`;
            document.body.appendChild(soundNotification);
            
            setTimeout(() => {
                soundNotification.remove();
            }, 2000);
        }
    }

    // 时间系统
    startTimeSystem() {
        // 每30秒更新一次时间
        setInterval(() => {
            this.updateTimeOfDay();
            this.updateSeason();
            this.updateRanchStatus();
            
            // 动物副产品产出
            this.produceAnimalProducts();
            
            // 随机播放动物音效
            if (Math.random() < 0.3) {
                this.playRanchSound();
            }
        }, 30000);
    }

    updateTimeOfDay() {
        const times = Object.keys(this.ranchEnvironment.timeSystem);
        const currentIndex = times.indexOf(this.ranchEnvironment.timeOfDay);
        const nextIndex = (currentIndex + 1) % times.length;
        
        this.ranchEnvironment.timeOfDay = times[nextIndex];
        
        const timeElement = document.getElementById('ranch-time');
        const moodElement = document.getElementById('ranch-mood');
        
        if (timeElement && moodElement) {
            const timeData = this.ranchEnvironment.timeSystem[this.ranchEnvironment.timeOfDay];
            timeElement.innerHTML = `${timeData.icon} 现在是${timeData.title}`;
            moodElement.textContent = timeData.mood;
        }
    }

    updateSeason() {
        // 每2分钟换一次季节（演示用）
        if (Math.random() < 0.1) {
            const seasons = Object.keys(this.ranchEnvironment.seasons);
            const currentIndex = seasons.indexOf(this.ranchEnvironment.season);
            const nextIndex = (currentIndex + 1) % seasons.length;
            
            this.ranchEnvironment.season = seasons[nextIndex];
            
            const seasonElement = document.getElementById('ranch-season');
            if (seasonElement) {
                const seasonData = this.ranchEnvironment.seasons[this.ranchEnvironment.season];
                seasonElement.innerHTML = `${seasonData.icon} ${seasonData.title}`;
            }
        }
    }

    updateRanchStatus() {
        const titleElement = document.getElementById('ranch-title');
        if (titleElement) {
            const totalAnimals = Object.values(this.animals).reduce((sum, count) => sum + (count || 0), 0);
            const avgHealth = this.calculateAverageHealth();
            const currentWeather = this.gameState ? this.ranchEnvironment.weatherEffects[this.gameState.weather] : null;
            
            let title = '牧场悠闲时光';
            if (totalAnimals === 0) {
                title = '空旷的牧场';
            } else if (currentWeather && currentWeather.animalEffects.drawbacks.length > 0) {
                title = `${currentWeather.title}中的牧场`;
            } else if (avgHealth > 80) {
                title = '繁荣的牧场';
            } else if (avgHealth < 40) {
                title = '需要关爱的牧场';
            }
            
            titleElement.textContent = title;
        }
    }

    calculateAverageHealth() {
        const animalIds = ['chicken', 'cow', 'sheep', 'pig', 'duck', 'goat', 'rabbit', 'horse'];
        let totalHealth = 0;
        let animalCount = 0;
        
        animalIds.forEach(id => {
            const count = this.animals[id] || 0;
            if (count > 0) {
                const baseHealth = this.animalHealth[id] || 100;
                const weatherHealth = this.calculateWeatherAffectedHealth(id);
                const finalHealth = Math.max(0, Math.min(100, baseHealth + weatherHealth));
                totalHealth += finalHealth * count;
                animalCount += count;
            }
        });
        
        return animalCount > 0 ? Math.round(totalHealth / animalCount) : 100;
    }

    // 计算天气影响的健康值
    calculateWeatherAffectedHealth(animalId) {
        if (!this.gameState || !this.gameState.weather) return 0;
        
        const weather = this.gameState.weather;
        const weatherEffects = this.ranchEnvironment.weatherEffects[weather];
        if (!weatherEffects) return 0;
        
        let healthModifier = 0;
        
        // 根据天气类型计算健康影响
        switch (weather) {
            case 'rainy':
                // 雨天：有庇护时健康+5，无庇护时健康-10
                const hasShelter = this.animalShelter[animalId] || false;
                healthModifier = hasShelter ? 5 : -10;
                break;
            case 'sunny':
                // 晴天：有水分时健康+3，缺水时健康-5
                const sunnyWaterLevel = this.animalWaterSupply[animalId] || 100;
                healthModifier = sunnyWaterLevel > 50 ? 3 : -5;
                break;
            case 'stormy':
                // 暴风雨：有庇护时健康-5，无庇护时健康-20
                const hasStormShelter = this.animalShelter[animalId] || false;
                healthModifier = hasStormShelter ? -5 : -20;
                break;
            case 'snowy':
                // 雪天：有庇护时健康-3，无庇护时健康-15
                const hasSnowShelter = this.animalShelter[animalId] || false;
                healthModifier = hasSnowShelter ? -3 : -15;
                break;
            case 'drought':
                // 干旱：水分充足时健康-5，缺水时健康-15
                const droughtWaterLevel = this.animalWaterSupply[animalId] || 100;
                healthModifier = droughtWaterLevel > 50 ? -5 : -15;
                break;
            case 'typhoon':
                // 台风：有庇护时健康-10，无庇护时健康-25
                const hasTyphoonShelter = this.animalShelter[animalId] || false;
                healthModifier = hasTyphoonShelter ? -10 : -25;
                break;
            case 'rainbow':
                // 彩虹天：健康+10
                healthModifier = 10;
                break;
            default:
                healthModifier = 0;
        }
        
        // 考虑伤病影响
        const injuries = this.animalInjuries[animalId] || [];
        const injuryPenalty = injuries.reduce((total, injury) => total + (injury.severity * 5), 0);
        
        // 确保返回值是整数，避免小数点导致的显示波动
        return Math.round(healthModifier - injuryPenalty);
    }

    // 动物副产品产出
    produceAnimalProducts() {
        const animalProductMap = {
            chicken: 'egg',
            cow: 'milk',
            sheep: 'wool',
            pig: 'pork',
            duck: 'duck_egg',
            goat: 'goat_milk',
            rabbit: 'rabbit_fur',
            horse: 'horse_manure'
        };

        let totalProduced = 0;
        const productionLog = [];

        Object.keys(this.animals).forEach(animalId => {
            const count = this.animals[animalId] || 0;
            if (count === 0) return;

            const baseHealth = this.animalHealth[animalId] || 100;
            const weatherHealth = this.calculateWeatherAffectedHealth(animalId);
            const finalHealth = Math.max(0, Math.min(100, baseHealth + weatherHealth));
            
            // 健康度影响产出概率
            const healthFactor = finalHealth / 100;
            
            // 基础产出概率（每只动物30%概率产出）
            const baseChance = 0.3 * healthFactor;
            
            // 天气影响产出效率
            let weatherBonus = 1.0;
            if (this.gameState && this.gameState.weather) {
                const weatherEffects = this.ranchEnvironment.weatherEffects[this.gameState.weather];
                if (weatherEffects && weatherEffects.animalEffects.productionBonus) {
                    weatherBonus = weatherEffects.animalEffects.productionBonus;
                }
            }

            // 计算实际产出
            let produced = 0;
            for (let i = 0; i < count; i++) {
                if (Math.random() < baseChance) {
                    produced += Math.floor(weatherBonus);
                }
            }

            if (produced > 0) {
                const productType = animalProductMap[animalId];
                this.animalProducts[productType] = (this.animalProducts[productType] || 0) + produced;
                totalProduced += produced;
                productionLog.push(`${this.getAnimalName(animalId)}产出了${produced}个${this.getProductName(productType)}`);
            }
        });

        // 同步到游戏状态
        if (this.gameState) {
            this.gameState.animalProducts = this.animalProducts;
        }

        // 显示产出通知
        if (totalProduced > 0) {
            this.showNotification(`动物们产出了${totalProduced}个副产品！`, 'success');
            console.log('产出详情:', productionLog.join(', '));
        }
    }

    // 获取副产品名称
    getProductName(productId) {
        const productNames = {
            egg: '鸡蛋',
            milk: '牛奶',
            wool: '羊毛',
            pork: '猪肉',
            duck_egg: '鸭蛋',
            goat_milk: '山羊奶',
            rabbit_fur: '兔毛',
            horse_manure: '马粪'
        };
        return productNames[productId] || productId;
    }

    // 动物应对天气系统功能
    handleAnimalWeatherResponse() {
        if (!this.gameState) return;
        
        const currentWeather = this.ranchEnvironment.weatherEffects[this.gameState.weather];
        if (!currentWeather) return;
        
        const animalIds = ['chicken', 'cow', 'sheep', 'pig', 'duck', 'goat', 'rabbit', 'horse'];
        const effects = currentWeather.animalEffects;
        
        animalIds.forEach(animalId => {
            const animalCount = this.animals[animalId] || 0;
            if (animalCount === 0) return;
            
            // 处理庇护需求
            if (effects.shelterNeed && !this.animalShelter[animalId]) {
                // 检查是否有庇护所设施
                const hasShelter = (this.gameState.decors.shelter || 0) > 0;
                if (hasShelter) {
                    // 有庇护所，自动提供庇护
                    this.animalShelter[animalId] = true;
                    this.animalStress[animalId] = Math.max(0, this.animalStress[animalId] - 5);
                    this.showNotification(`${this.getAnimalName(animalId)}自动获得庇护！`, 'success');
                } else {
                    // 动物需要庇护但没有庇护
                    this.animalHealth[animalId] = Math.max(0, this.animalHealth[animalId] - 5);
                    this.animalStress[animalId] = Math.min(100, this.animalStress[animalId] + 10);
                    this.showNotification(`${this.getAnimalName(animalId)}需要庇护！健康度下降`, 'warning');
                }
            }
            
            // 处理水分需求
            if (effects.waterNeed && effects.waterNeed > 1) {
                const waterConsumption = effects.waterNeed * 2; // 天气影响水分消耗
                this.animalWaterSupply[animalId] = Math.max(0, this.animalWaterSupply[animalId] - waterConsumption);
                
                // 检查是否有自动饮水系统
                const hasWaterSystem = (this.gameState.decors.water_system || 0) > 0;
                if (hasWaterSystem && this.animalWaterSupply[animalId] < 50) {
                    // 自动补充水分
                    this.animalWaterSupply[animalId] = 100;
                    this.showNotification(`${this.getAnimalName(animalId)}自动补充水分！`, 'success');
                } else if (this.animalWaterSupply[animalId] < 30) {
                    this.animalHealth[animalId] = Math.max(0, this.animalHealth[animalId] - 3);
                    this.showNotification(`${this.getAnimalName(animalId)}缺水！需要补充水分`, 'warning');
                }
            }
            
            // 处理压力值
            if (effects.stressLevel === 'high') {
                this.animalStress[animalId] = Math.min(100, this.animalStress[animalId] + 15);
            }
            
            // 处理伤病风险
            if (effects.injuryRisk && Math.random() < effects.injuryRisk) {
                // 检查是否有医疗箱
                const hasMedicalKit = (this.gameState.decors.medical_kit || 0) > 0;
                if (hasMedicalKit) {
                    // 自动治疗
                    this.showNotification(`${this.getAnimalName(animalId)}受伤但被医疗箱自动治疗！`, 'success');
                } else {
                    const injury = {
                        type: 'weather_injury',
                        severity: Math.floor(Math.random() * 3) + 1, // 1-3级严重程度
                        timestamp: Date.now(),
                        weather: this.gameState.weather
                    };
                    this.animalInjuries[animalId].push(injury);
                    this.animalHealth[animalId] = Math.max(0, this.animalHealth[animalId] - 20);
                    this.showNotification(`${this.getAnimalName(animalId)}在${currentWeather.title}中受伤了！`, 'error');
                }
            }
            
            // 处理呼吸问题（沙尘暴）
            if (effects.respiratoryIssues) {
                this.animalHealth[animalId] = Math.max(0, this.animalHealth[animalId] - 2);
                this.animalStress[animalId] = Math.min(100, this.animalStress[animalId] + 5);
            }
        });
        
        // 更新动物状态显示
        this.renderAnimalWeatherStatus();
        
        // 同步到游戏状态
        this.syncToGameState();
    }

    // 更新牧场天气显示（与主天气系统同步）
    updateRanchWeather() {
        if (!this.gameState) return;
        
        const weatherEffect = document.getElementById('ranch-weather-effect');
        const currentWeather = this.ranchEnvironment.weatherEffects[this.gameState.weather];
        
        if (currentWeather && weatherEffect) {
            weatherEffect.className = `absolute inset-0 pointer-events-none z-5 ${currentWeather.effect}`;
        }
        
        // 处理天气对动物的影响
        this.handleAnimalWeatherResponse();
    }

    // 动物天气状态渲染
    renderAnimalWeatherStatus() {
        const statusBox = document.getElementById('animal-weather-status');
        if (!statusBox || !this.gameState) return;
        
        const currentWeather = this.ranchEnvironment.weatherEffects[this.gameState.weather];
        if (!currentWeather) return;
        
        let statusHtml = `
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 class="font-bold text-lg mb-2 flex items-center">
                    <span class="text-2xl mr-2">${currentWeather.icon}</span>
                    ${currentWeather.title}对动物的影响
                </h3>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold text-green-600 mb-1">好处：</h4>
                        <ul class="text-sm text-green-700">
                            ${currentWeather.animalEffects.benefits.map(benefit => `<li>• ${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold text-red-600 mb-1">坏处：</h4>
                        <ul class="text-sm text-red-700">
                            ${currentWeather.animalEffects.drawbacks.map(drawback => `<li>• ${drawback}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="mt-3">
                    <h4 class="font-semibold text-blue-600 mb-1">建议行动：</h4>
                    <div class="flex flex-wrap gap-2">
                        ${currentWeather.animalEffects.specialActions.map(action => {
                            return `<button class="weather-action-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" data-action="${action}">${action}</button>`;
                        }).join('')}
                    </div>
                </div>
                <div class="mt-3 text-sm text-gray-600">
                    <p>💡 提示：详细的动物状态信息请查看右侧的"我的动物"区域</p>
                </div>
            </div>
        `;
        
        statusBox.innerHTML = statusHtml;
        
        // 绑定天气行动按钮
        document.querySelectorAll('.weather-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.executeWeatherAction(action);
            });
        });
    }

    // 执行天气应对行动
    executeWeatherAction(action) {
        if (!this.gameState) return;
        
        const currentWeather = this.ranchEnvironment.weatherEffects[this.gameState.weather];
        if (!currentWeather) return;
        
        // 定义行动效果和成本
        const actionEffects = {
            '提供遮阳': {
                cost: 10,
                effect: () => {
                    this.showNotification('为动物提供了遮阳设施，减少了中暑风险！', 'success');
                    // 减少健康度下降
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 5);
                        }
                    });
                }
            },
            '增加饮水': {
                cost: 15,
                effect: () => {
                    this.showNotification('为动物增加了饮水设施，缓解了缺水问题！', 'success');
                    // 恢复水分供应
                    Object.keys(this.animalWaterSupply).forEach(animalId => {
                        this.animalWaterSupply[animalId] = Math.min(100, this.animalWaterSupply[animalId] + 30);
                    });
                }
            },
            '防暑降温': {
                cost: 20,
                effect: () => {
                    this.showNotification('实施了防暑降温措施，动物们感觉舒适多了！', 'success');
                    // 大幅恢复健康度
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 15);
                        }
                    });
                }
            },
            '搭建雨棚': {
                cost: 25,
                effect: () => {
                    this.showNotification('搭建了雨棚，保护动物免受雨水侵袭！', 'success');
                    // 为所有动物提供庇护
                    Object.keys(this.animalShelter).forEach(animalId => {
                        this.animalShelter[animalId] = true;
                    });
                }
            },
            '保持干燥': {
                cost: 15,
                effect: () => {
                    this.showNotification('保持了动物居住环境的干燥！', 'success');
                    // 减少疾病风险
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalStress[animalId] = Math.max(0, this.animalStress[animalId] - 10);
                        }
                    });
                }
            },
            '预防感冒': {
                cost: 20,
                effect: () => {
                    this.showNotification('采取了预防感冒的措施，增强了动物抵抗力！', 'success');
                    // 增强免疫力
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 10);
                        }
                    });
                }
            },
            '紧急避难': {
                cost: 30,
                effect: () => {
                    this.showNotification('启动了紧急避难程序，所有动物都已安全！', 'success');
                    // 保护所有动物
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalShelter[animalId] = true;
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 20);
                        }
                    });
                }
            },
            '安抚动物': {
                cost: 10,
                effect: () => {
                    this.showNotification('安抚了受惊的动物，它们逐渐平静下来！', 'success');
                    // 减少压力
                    Object.keys(this.animalStress).forEach(animalId => {
                        this.animalStress[animalId] = Math.max(0, this.animalStress[animalId] - 20);
                    });
                }
            },
            '加固设施': {
                cost: 35,
                effect: () => {
                    this.showNotification('加固了牧场设施，提高了防护能力！', 'success');
                    // 增强庇护效果
                    Object.keys(this.animalShelter).forEach(animalId => {
                        this.animalShelter[animalId] = true;
                    });
                }
            },
            '紧急供水': {
                cost: 25,
                effect: () => {
                    this.showNotification('启动了紧急供水系统，缓解了缺水危机！', 'success');
                    // 大幅恢复水分
                    Object.keys(this.animalWaterSupply).forEach(animalId => {
                        this.animalWaterSupply[animalId] = Math.min(100, this.animalWaterSupply[animalId] + 50);
                    });
                }
            },
            '降温措施': {
                cost: 20,
                effect: () => {
                    this.showNotification('实施了降温措施，动物们感觉凉爽多了！', 'success');
                    // 恢复健康度
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 12);
                        }
                    });
                }
            },
            '减少活动': {
                cost: 5,
                effect: () => {
                    this.showNotification('减少了动物活动，降低了消耗！', 'success');
                    // 减少压力和水份消耗
                    Object.keys(this.animalStress).forEach(animalId => {
                        this.animalStress[animalId] = Math.max(0, this.animalStress[animalId] - 5);
                    });
                }
            },
            '加固围栏': {
                cost: 30,
                effect: () => {
                    this.showNotification('加固了围栏，提高了防护能力！', 'success');
                    // 增强庇护效果
                    Object.keys(this.animalShelter).forEach(animalId => {
                        this.animalShelter[animalId] = true;
                    });
                }
            },
            '医疗准备': {
                cost: 40,
                effect: () => {
                    this.showNotification('准备了医疗设施，随时可以救治受伤动物！', 'success');
                    // 治疗现有伤病
                    Object.keys(this.animalInjuries).forEach(animalId => {
                        if (this.animalInjuries[animalId].length > 0) {
                            this.animalInjuries[animalId] = [];
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 25);
                        }
                    });
                }
            },
            '户外活动': {
                cost: 5,
                effect: () => {
                    this.showNotification('让动物享受户外活动，心情变好了！', 'success');
                    // 提升心情和健康
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalStress[animalId] = Math.max(0, this.animalStress[animalId] - 15);
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 8);
                        }
                    });
                }
            },
            '增加互动': {
                cost: 8,
                effect: () => {
                    this.showNotification('增加了与动物的互动，它们更加亲近了！', 'success');
                    // 提升心情
                    Object.keys(this.animalStress).forEach(animalId => {
                        this.animalStress[animalId] = Math.max(0, this.animalStress[animalId] - 10);
                    });
                }
            },
            '享受时光': {
                cost: 3,
                effect: () => {
                    this.showNotification('让动物们享受美好时光，整体状态提升！', 'success');
                    // 全面提升状态
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 10);
                            this.animalStress[animalId] = Math.max(0, this.animalStress[animalId] - 15);
                            this.animalWaterSupply[animalId] = Math.min(100, this.animalWaterSupply[animalId] + 20);
                        }
                    });
                }
            },
            '防护措施': {
                cost: 25,
                effect: () => {
                    this.showNotification('实施了防护措施，保护动物免受沙尘侵袭！', 'success');
                    // 提供庇护和恢复
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalShelter[animalId] = true;
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 15);
                        }
                    });
                }
            },
            '医疗护理': {
                cost: 35,
                effect: () => {
                    this.showNotification('提供了医疗护理，治疗了呼吸问题！', 'success');
                    // 治疗呼吸问题
                    Object.keys(this.animals).forEach(animalId => {
                        if (this.animals[animalId] > 0) {
                            this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 20);
                            this.animalInjuries[animalId] = this.animalInjuries[animalId].filter(injury => injury !== 'respiratory');
                        }
                    });
                }
            }
        };
        
        const actionData = actionEffects[action];
        if (!actionData) {
            this.showNotification(`未知行动: ${action}`, 'error');
            return;
        }
        
        // 检查金币是否足够
        if (this.gameState.money < actionData.cost) {
            this.showNotification(`金币不足！需要 ${actionData.cost} 金币`, 'error');
            return;
        }
        
        // 扣除金币并执行效果
        this.gameState.money -= actionData.cost;
        actionData.effect();
        
        // 更新显示
        this.updateDisplay();
        this.syncToGameState();
        
        // 更新UI
        if (typeof window.updateUI === 'function') {
            window.updateUI();
        }
    }

    // 显示动物道具菜单
    showAnimalItemMenu(animalId) {
        const animalName = this.getAnimalName(animalId);
        const animalItems = [
            { 
                id: 'vitamin_pill', 
                name: '维生素丸', 
                icon: '💊', 
                desc: '快速恢复健康', 
                effect: 'health', 
                value: 50,
                cost: 30,
                color: 'bg-green-100 border-green-300'
            },
            { 
                id: 'stress_relief_pill', 
                name: '安抚药丸', 
                icon: '😌', 
                desc: '降低压力值', 
                effect: 'stress', 
                value: -30,
                cost: 25,
                color: 'bg-blue-100 border-blue-300'
            },
            { 
                id: 'water_supplement', 
                name: '水分补充剂', 
                icon: '💧', 
                desc: '补充水分', 
                effect: 'water', 
                value: 50,
                cost: 20,
                color: 'bg-cyan-100 border-cyan-300'
            },
            { 
                id: 'healing_ointment', 
                name: '治疗药膏', 
                icon: '🩹', 
                desc: '治疗伤病', 
                effect: 'healing', 
                value: 30,
                cost: 35,
                color: 'bg-red-100 border-red-300'
            },
            { 
                id: 'happiness_treat', 
                name: '快乐零食', 
                icon: '🍪', 
                desc: '提升心情', 
                effect: 'happiness', 
                value: 40,
                cost: 15,
                color: 'bg-yellow-100 border-yellow-300'
            },
            { 
                id: 'growth_hormone', 
                name: '生长激素', 
                icon: '📈', 
                desc: '促进生长', 
                effect: 'growth', 
                value: 25,
                cost: 45,
                color: 'bg-purple-100 border-purple-300'
            }
        ];

        // 检查道具库存
        const availableItems = animalItems.filter(item => {
            return this.gameState && this.gameState.items && (this.gameState.items[item.id] || 0) > 0;
        });

        if (availableItems.length === 0) {
            this.showNotification('没有可用的动物道具！请先去商店购买。', 'warning');
            return;
        }

        const content = `
            <div class="p-4">
                <div class="text-center mb-4">
                    <div class="text-3xl mb-2">${this.getAnimalIcon(animalId)}</div>
                    <h3 class="text-lg font-bold">为 ${animalName} 使用道具</h3>
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                    ${availableItems.map(item => {
                        const itemCount = this.gameState.items[item.id] || 0;
                        return `
                            <div class="p-3 ${item.color} rounded-lg border-2 hover:shadow-lg cursor-pointer transition-all"
                                 onclick="ranchModule.useAnimalItem('${animalId}', '${item.id}', '${item.effect}', ${item.value})">
                                <div class="text-2xl text-center mb-2">${item.icon}</div>
                                <div class="font-bold text-center text-sm mb-1">${item.name}</div>
                                <div class="text-xs text-gray-600 text-center mb-2">${item.desc}</div>
                                <div class="text-xs text-center">
                                    <span class="text-green-600">库存: ${itemCount}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="mt-4 text-center">
                    <button class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onclick="ranchModule.closeModal()">
                        取消
                    </button>
                </div>
            </div>
        `;

        this.showModal(`${animalName}道具使用`, content);
    }

    // 同步数据到游戏状态
    syncToGameState() {
        if (!this.gameState) return;
        
        this.gameState.animals = this.animals;
        this.gameState.animalHealth = this.animalHealth;
        this.gameState.animalFeed = this.animalFeed;
        this.gameState.animalProducts = this.animalProducts;
        this.gameState.happiness = this.happiness;
        this.gameState.animalShelter = this.animalShelter;
        this.gameState.animalWaterSupply = this.animalWaterSupply;
        this.gameState.animalStress = this.animalStress;
        this.gameState.animalInjuries = this.animalInjuries;
        
        console.log('同步到游戏状态 - 健康值:', JSON.stringify(this.gameState.animalHealth));
    }

    // 获取动物名称
    getAnimalName(animalId) {
        const names = {
            chicken: '鸡',
            cow: '牛',
            sheep: '羊',
            pig: '猪',
            duck: '鸭子',
            goat: '山羊',
            rabbit: '兔子',
            horse: '马'
        };
        return names[animalId] || animalId;
    }

    // 获取动物图标
    getAnimalIcon(animalId) {
        const icons = {
            chicken: '🐔',
            cow: '🐄',
            sheep: '🐑',
            pig: '🐷',
            duck: '🦆',
            goat: '🐐',
            rabbit: '🐰',
            horse: '🐎'
        };
        return icons[animalId] || '🐾';
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

    // 渲染栅栏状态
    renderFenceStatus() {
        const container = document.getElementById('fence-status');
        if (!container) return;

        const fenceData = [
            { id: 'chicken_fence', name: '鸡圈栅栏', animalType: 'chicken', icon: '🐔', color: 'bg-yellow-100' },
            { id: 'cow_fence', name: '牛棚栅栏', animalType: 'cow', icon: '🐄', color: 'bg-amber-100' },
            { id: 'sheep_fence', name: '羊圈栅栏', animalType: 'sheep', icon: '🐑', color: 'bg-gray-100' },
            { id: 'pig_fence', name: '猪圈栅栏', animalType: 'pig', icon: '🐷', color: 'bg-pink-100' },
            { id: 'duck_fence', name: '鸭园栅栏', animalType: 'duck', icon: '🦆', color: 'bg-blue-100' },
            { id: 'goat_fence', name: '山羊圈栅栏', animalType: 'goat', icon: '🐐', color: 'bg-orange-100' },
            { id: 'rabbit_fence', name: '兔园栅栏', animalType: 'rabbit', icon: '🐰', color: 'bg-purple-100' },
            { id: 'horse_fence', name: '马厩栅栏', animalType: 'horse', icon: '🐎', color: 'bg-red-100' }
        ];

        container.innerHTML = fenceData.map(fence => {
            const fenceCount = this.gameState && this.gameState.decors ? (this.gameState.decors[fence.id] || 0) : 0;
            const isComplete = fenceCount >= 8;
            const progress = Math.min(100, (fenceCount / 8) * 100);
            
            return `
                <div class="p-4 ${fence.color} rounded-lg border-2 ${isComplete ? 'border-green-500' : 'border-gray-300'} hover:shadow-lg transition-all">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                            <span class="text-2xl mr-2">${fence.icon}</span>
                            <div>
                                <div class="font-bold text-sm">${fence.name}</div>
                                <div class="text-xs text-gray-600">${fenceCount}/8 段</div>
                            </div>
                        </div>
                        <div class="text-right">
                            ${isComplete ? 
                                '<span class="text-green-600 text-sm font-bold">✓ 完整</span>' : 
                                '<span class="text-yellow-600 text-sm">建设中</span>'
                            }
                        </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div class="${isComplete ? 'bg-green-500' : 'bg-yellow-500'} h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
                    </div>
                    <div class="text-xs text-gray-500">
                        ${isComplete ? '提供完整天气保护' : '需要更多栅栏段'}
                    </div>
                </div>
            `;
        }).join('');
    }


}

// 创建全局牧场模块实例
if (typeof window !== 'undefined') {
    window.ranchModule = new RanchModule();
    window.ranchEnvironment = window.ranchModule.ranchEnvironment;
    window.initRanchEnvironment = function() {
        window.ranchModule.initRanchEnvironment();
    };
} 
