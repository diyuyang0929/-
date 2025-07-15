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
            
            // 天气对动物的影响
            weatherEffects: {
                sunny: {
                    icon: '☀️',
                    title: '晴天',
                    effect: 'sunny-effect',
                    animalEffects: {
                        benefits: ['产出效率+20%', '健康度缓慢恢复', '动物心情愉悦'],
                        drawbacks: ['水分消耗增加', '需要更多饮水', '中暑风险'],
                        productionBonus: 1.2,
                        healthDecayModifier: 0.8,
                        waterNeed: 1.5,
                        shelterNeed: false,
                        specialActions: ['提供遮阳', '增加饮水', '防暑降温']
                    }
                },
                rainy: {
                    icon: '🌧️',
                    title: '雨天',
                    effect: 'rainy-effect',
                    animalEffects: {
                        benefits: ['自动补充水分', '清洁环境', '降低疾病风险'],
                        drawbacks: ['产出效率-10%', '容易感冒', '泥泞环境'],
                        productionBonus: 0.9,
                        healthDecayModifier: 1.1,
                        diseaseResistance: 1.2,
                        shelterNeed: true,
                        specialActions: ['搭建雨棚', '保持干燥', '预防感冒']
                    }
                },
                stormy: {
                    icon: '⛈️',
                    title: '暴雨',
                    effect: 'stormy-effect',
                    animalEffects: {
                        benefits: ['充足水源', '环境清洁'],
                        drawbacks: ['产出停止', '健康度快速下降', '动物恐慌'],
                        productionBonus: 0,
                        healthDecayModifier: 2.0,
                        stressLevel: 'high',
                        shelterNeed: true,
                        specialActions: ['紧急避难', '安抚动物', '加固设施']
                    }
                },
                drought: {
                    icon: '🔥',
                    title: '干旱',
                    effect: 'drought-effect',
                    animalEffects: {
                        benefits: ['干燥环境减少细菌'],
                        drawbacks: ['严重缺水', '产出减半', '健康度快速下降'],
                        productionBonus: 0.5,
                        healthDecayModifier: 2.5,
                        waterNeed: 3.0,
                        shelterNeed: false,
                        specialActions: ['紧急供水', '降温措施', '减少活动']
                    }
                },
                typhoon: {
                    icon: '🌀',
                    title: '台风',
                    effect: 'typhoon-effect',
                    animalEffects: {
                        benefits: ['台风过后空气清新'],
                        drawbacks: ['动物受惊', '产出停止', '可能受伤'],
                        productionBonus: 0,
                        healthDecayModifier: 1.8,
                        injuryRisk: 0.1,
                        shelterNeed: true,
                        specialActions: ['紧急避难', '加固围栏', '医疗准备']
                    }
                },
                rainbow: {
                    icon: '🌈',
                    title: '彩虹天',
                    effect: 'rainbow-effect',
                    animalEffects: {
                        benefits: ['动物心情极佳', '产出品质提升', '健康度恢复'],
                        drawbacks: [],
                        productionBonus: 1.5,
                        healthDecayModifier: 0.5,
                        qualityBonus: 1.5,
                        shelterNeed: false,
                        specialActions: ['户外活动', '增加互动', '享受时光']
                    }
                },
                sandstorm: {
                    icon: '🌪️',
                    title: '沙尘暴',
                    effect: 'sandstorm-effect',
                    animalEffects: {
                        benefits: [],
                        drawbacks: ['呼吸困难', '产出停止', '健康度下降', '视野受阻'],
                        productionBonus: 0,
                        healthDecayModifier: 2.2,
                        respiratoryIssues: true,
                        shelterNeed: true,
                        specialActions: ['紧急避难', '防护措施', '医疗护理']
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
                        <div class="text-3xl font-bold text-purple-600" id="happiness-level">0%</div>
                        <div class="text-sm text-gray-600">幸福度</div>
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

                <!-- 动物商店 -->
                <div class="mb-8">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-store mr-2"></i> 动物商店
                    </h3>
                    <div id="animal-shop" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- 商店内容将通过JS动态生成 -->
                    </div>
                </div>

                <!-- 我的动物列表 -->
                <div class="mb-8">
                    <h3 class="text-xl font-bold mb-4 flex items-center">
                        <i class="fas fa-list mr-2"></i> 我的动物
                    </h3>
                    <div id="my-animals" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- 动物列表将通过JS动态生成 -->
                    </div>
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
        if (window.money >= 10) {
            window.money -= 10;
            this.animalFeed += 1;
            this.showMessage('购买饲料成功！', 'success');
            this.updateDisplay();
            if (typeof window.updateUI === 'function') {
                window.updateUI();
            }
        } else {
            this.showMessage('金币不足！', 'error');
        }
    }

    // 喂养全部动物
    feedAllAnimals() {
        const totalAnimals = Object.values(this.animals).reduce((sum, count) => sum + count, 0);
        if (totalAnimals === 0) {
            this.showMessage('没有动物需要喂养！', 'error');
            return;
        }
        if (this.animalFeed < totalAnimals) {
            this.showMessage('饲料不足！', 'error');
            return;
        }
        
        Object.keys(this.animals).forEach(animalType => {
            if (this.animals[animalType] > 0) {
                this.animalHealth[animalType] = Math.min(100, this.animalHealth[animalType] + 10);
            }
        });
        this.animalFeed -= totalAnimals;
        
        this.showMessage(`成功喂养了${totalAnimals}只动物！`, 'success');
        this.updateDisplay();
    }

    // 出售所有副产品
    sellAllProducts() {
        let totalEarned = 0;
        const productPrices = {
            egg: 5, milk: 8, wool: 12, pork: 15,
            duck_egg: 6, goat_milk: 10, rabbit_fur: 20, horse_manure: 3
        };

        Object.keys(this.animalProducts).forEach(product => {
            const count = this.animalProducts[product];
            if (count > 0) {
                totalEarned += count * (productPrices[product] || 1);
                this.animalProducts[product] = 0;
            }
        });

        if (totalEarned > 0) {
            window.money += totalEarned;
            this.showMessage(`出售成功！获得${totalEarned}金币`, 'success');
            this.updateDisplay();
            if (typeof window.updateUI === 'function') {
                window.updateUI();
            }
        } else {
            this.showMessage('没有副产品可以出售！', 'error');
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

    // 渲染我的动物
    renderMyAnimals() {
        const box = document.getElementById('my-animals');
        if (!box) return;

        const animalList = [
            { id: 'chicken', name: '鸡', icon: '🐔', rarity: 'common' },
            { id: 'cow', name: '牛', icon: '🐄', rarity: 'common' },
            { id: 'sheep', name: '羊', icon: '🐑', rarity: 'common' },
            { id: 'pig', name: '猪', icon: '🐷', rarity: 'uncommon' },
            { id: 'duck', name: '鸭子', icon: '🦆', rarity: 'common' },
            { id: 'goat', name: '山羊', icon: '🐐', rarity: 'uncommon' },
            { id: 'rabbit', name: '兔子', icon: '🐰', rarity: 'rare' },
            { id: 'horse', name: '马', icon: '🐎', rarity: 'epic' }
        ];
        
        const rarityColors = {
            common: 'bg-gray-50',
            uncommon: 'bg-green-50',
            rare: 'bg-blue-50',
            epic: 'bg-purple-50'
        };
        
        box.innerHTML = animalList.map(animal => {
            const count = this.animals[animal.id] || 0;
            const health = this.animalHealth[animal.id] || 100;
            return `
                <div class="p-3 ${rarityColors[animal.rarity]} rounded-lg border hover:shadow-lg transition-all">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <span class="text-2xl mr-2">${animal.icon}</span>
                            <div>
                                <div class="font-bold">${animal.name}</div>
                                <div class="text-sm text-gray-600">数量: ${count}</div>
                                <div class="text-sm text-green-600">健康: ${health}%</div>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-1">
                            <button onclick="ranchModule.feedAnimal('${animal.id}')" 
                                    class="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 ${count > 0 ? '' : 'opacity-50 cursor-not-allowed'}"
                                    ${count > 0 ? '' : 'disabled'}>
                                喂食
                            </button>
                            <button onclick="ranchModule.showAnimalItemMenu('${animal.id}')" 
                                    class="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 ${count > 0 ? '' : 'opacity-50 cursor-not-allowed'}"
                                    ${count > 0 ? '' : 'disabled'}>
                                使用道具
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 购买动物
    buyAnimal(animalId, price) {
        if (window.money < price) {
            this.showMessage('金币不足！', 'error');
            return;
        }
        
        window.money -= price;
        this.animals[animalId] = (this.animals[animalId] || 0) + 1;
        
        this.showMessage(`购买${this.getAnimalName(animalId)}成功！`, 'success');
        this.updateDisplay();
        if (typeof window.updateUI === 'function') {
            window.updateUI();
        }
    }

    // 喂食动物
    feedAnimal(animalId) {
        if (this.animalFeed <= 0) {
            this.showMessage('饲料不足！', 'error');
            return;
        }
        
        if (!this.animals[animalId] || this.animals[animalId] <= 0) {
            this.showMessage(`你没有${this.getAnimalName(animalId)}`, 'error');
            return;
        }
        
        this.animalFeed--;
        this.animalHealth[animalId] = Math.min(100, this.animalHealth[animalId] + 10);
        this.showMessage(`喂食${this.getAnimalName(animalId)}成功！健康度+10`, 'success');
        
        this.updateDisplay();
    }

    // 显示动物道具菜单
    showAnimalItemMenu(animalId) {
        const animalName = this.getAnimalName(animalId);
        const animalItems = [
            { id: 'vitamin_pill', name: '维生素丸', icon: '💊', desc: '快速恢复健康', effect: 'health', value: 50 },
            { id: 'stress_relief_pill', name: '安抚药丸', icon: '😌', desc: '降低压力值', effect: 'stress', value: -30 },
            { id: 'water_supplement', name: '水分补充剂', icon: '💧', desc: '补充水分', effect: 'water', value: 50 },
            { id: 'healing_ointment', name: '治疗药膏', icon: '🩹', desc: '治疗伤病', effect: 'healing', value: 30 }
        ];

        const content = `
            <div class="grid grid-cols-2 gap-4">
                ${animalItems.map(item => `
                    <div class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                         onclick="ranchModule.useAnimalItem('${animalId}', '${item.id}', '${item.effect}', ${item.value})">
                        <div class="text-3xl text-center mb-2">${item.icon}</div>
                        <div class="font-bold text-center">${item.name}</div>
                        <div class="text-sm text-gray-600 text-center">${item.desc}</div>
                    </div>
                `).join('')}
            </div>
        `;

        this.showModal(`${animalName}道具使用`, content);
    }

    // 使用动物道具
    useAnimalItem(animalId, itemId, effect, value) {
        const animalName = this.getAnimalName(animalId);
        
        if (!this.animals[animalId] || this.animals[animalId] <= 0) {
            this.showMessage(`你没有${animalName}`, 'error');
            return;
        }
        
        if (effect === 'health') {
            this.animalHealth[animalId] = Math.min(100, (this.animalHealth[animalId] || 100) + value);
            this.showMessage(`${animalName}的健康度恢复了${value}点`, 'success');
        }
        
        this.closeModal();
        this.updateDisplay();
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
            'chicken': { name: '鸡舍', icon: '🥚', bgColor: 'bg-yellow-50', product: 'egg' },
            'cow': { name: '牛棚', icon: '🥛', bgColor: 'bg-amber-50', product: 'milk' },
            'sheep': { name: '羊圈', icon: '🧶', bgColor: 'bg-white', product: 'wool' },
            'pig': { name: '猪圈', icon: '🥩', bgColor: 'bg-pink-50', product: 'pork' },
            'duck': { name: '鸭园', icon: '🥚', bgColor: 'bg-blue-50', product: 'duck_egg' },
            'goat': { name: '山羊圈', icon: '🥛', bgColor: 'bg-orange-50', product: 'goat_milk' },
            'rabbit': { name: '兔园', icon: '🧶', bgColor: 'bg-purple-50', product: 'rabbit_fur' },
            'horse': { name: '马厩', icon: '💩', bgColor: 'bg-red-50', product: 'horse_manure' }
        };

        const currentAreaData = areaData[area];
        if (!currentAreaData) return;

        const count = this.animals[area] || 0;
        const health = this.animalHealth[area] || 100;
        const products = this.animalProducts[currentAreaData.product] || 0;

        container.innerHTML = `
            <div class="${currentAreaData.bgColor} p-6 rounded-lg border-2 border-gray-200">
                <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <span class="text-3xl mr-2">${currentAreaData.icon}</span> ${currentAreaData.name}
                </h3>
                <div class="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div class="bg-white rounded-lg p-4 border">
                        <div class="text-2xl font-bold text-blue-600">${count}</div>
                        <div class="text-sm text-gray-600">动物数量</div>
                    </div>
                    <div class="bg-white rounded-lg p-4 border">
                        <div class="text-2xl font-bold text-green-600">${health}%</div>
                        <div class="text-sm text-gray-600">平均健康</div>
                    </div>
                    <div class="bg-white rounded-lg p-4 border">
                        <div class="text-2xl font-bold text-orange-600">${products}</div>
                        <div class="text-sm text-gray-600">副产品</div>
                    </div>
                </div>
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
        this.updateRanchStats();
        this.renderMyAnimals();
        this.renderAnimalShop();
        this.renderAreaDetail(this.currentArea);
        this.renderRanchAnimals(); // 更新动物图标
        this.updateRanchWeather(); // 更新天气显示
        this.renderAnimalWeatherStatus(); // 更新动物天气状态
    }

    // 更新牧场统计
    updateRanchStats() {
        const totalAnimals = Object.values(this.animals).reduce((sum, count) => sum + count, 0);
        const healthValues = Object.values(this.animalHealth);
        const avgHealth = healthValues.length > 0 ? Math.round(healthValues.reduce((sum, health) => sum + health, 0) / healthValues.length) : 100;
        
        const totalAnimalsEl = document.getElementById('total-animals');
        const avgHealthEl = document.getElementById('avg-health');
        const feedCountEl = document.getElementById('feed-count');
        const happinessEl = document.getElementById('happiness-level');
        
        if (totalAnimalsEl) totalAnimalsEl.textContent = totalAnimals;
        if (avgHealthEl) avgHealthEl.textContent = `${avgHealth}%`;
        if (feedCountEl) feedCountEl.textContent = this.animalFeed;
        if (happinessEl) happinessEl.textContent = `${this.happiness}%`;
    }

    // 渲染牧场动物图标
    renderRanchAnimals() {
        const box = document.getElementById('ranch-animal-icons');
        if (!box) return;
        
        // 为牧场容器添加大气效果
        box.className = 'ranch-atmosphere grid grid-cols-4 gap-6 p-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg border-2 border-green-300 shadow-lg relative overflow-hidden';
        
        const animals = [
            { id: 'chicken', name: '鸡', icon: '🐔', animations: ['animal-walk', 'animal-bounce'] },
            { id: 'cow', name: '牛', icon: '🐄', animations: ['animal-sway', 'animal-breathe'] },
            { id: 'sheep', name: '羊', icon: '🐑', animations: ['animal-bounce', 'animal-sway'] },
            { id: 'pig', name: '猪', icon: '🐷', animations: ['animal-walk', 'animal-breathe'] },
            { id: 'duck', name: '鸭子', icon: '🦆', animations: ['animal-walk', 'animal-bounce'] },
            { id: 'goat', name: '山羊', icon: '🐐', animations: ['animal-bounce', 'animal-sway'] },
            { id: 'rabbit', name: '兔子', icon: '🐰', animations: ['animal-bounce', 'animal-walk'] },
            { id: 'horse', name: '马', icon: '🐎', animations: ['animal-walk', 'animal-sway'] }
        ];
        
        let animalElements = [];
        
        animals.forEach(animal => {
            const count = this.animals[animal.id] || 0;
            const health = this.animalHealth[animal.id] || 0;
            
            if (count > 0) {
                // 为每种动物创建多个个体（最多显示6个）
                const displayCount = Math.min(count, 6);
                
                for (let i = 0; i < displayCount; i++) {
                    // 随机选择动画效果
                    const randomAnimation = animal.animations[Math.floor(Math.random() * animal.animations.length)];
                    
                    // 根据健康度决定动画和样式
                    let healthClass = '';
                    if (health > 70) {
                        healthClass = 'animal-healthy';
                    } else if (health < 30) {
                        healthClass = 'animal-sick';
                    }
                    
                    // 随机延迟动画，让动物们不同步
                    const animationDelay = Math.random() * 3;
                    
                    animalElements.push(`
                        <div class="ranch-animal ${randomAnimation} ${healthClass} flex flex-col items-center justify-center p-2 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm hover:bg-opacity-80 transition-all duration-300" 
                             style="animation-delay: ${animationDelay}s;" 
                             title="${animal.name} - 健康度: ${Number(health).toFixed(2)}%">
                            <span class="text-base mb-1 animal-blink" style="animation-delay: ${animationDelay + 1}s; font-size:1.2rem;">${animal.icon}</span>
                            <span class="text-xs font-bold text-green-800">${animal.name}</span>
                            ${i === 0 && count > displayCount ? `<span class="text-xs text-gray-600">+${count - displayCount}只</span>` : ''}
                        </div>
                    `);
                }
            }
        });
        
        if (animalElements.length === 0) {
            box.innerHTML = `
                <div class="col-span-4 text-center py-12">
                    <div class="text-6xl mb-4 opacity-50">🌾</div>
                    <div class="text-gray-500 italic text-lg">空旷的牧场等待着动物们的到来...</div>
                    <div class="text-sm text-gray-400 mt-2">去商店购买一些动物吧！</div>
                </div>
            `;
        } else {
            // 添加环境装饰
            const environmentElements = [
                '<div class="ranch-decoration absolute top-2 left-2 text-2xl opacity-60 grass-sway">🌾</div>',
                '<div class="ranch-decoration absolute top-2 right-2 text-2xl opacity-60 cloud-float">☁️</div>',
                '<div class="ranch-decoration absolute bottom-2 left-2 text-xl opacity-50 grass-sway" style="animation-delay: 2s;">🌻</div>',
                '<div class="ranch-decoration absolute bottom-2 right-2 text-xl opacity-50 grass-sway" style="animation-delay: 1s;">🦋</div>'
            ];
            
            box.innerHTML = animalElements.join('') + environmentElements.join('');
        }
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
                totalHealth += (this.animalHealth[id] || 0) * count;
                animalCount += count;
            }
        });
        
        return animalCount > 0 ? Math.round(totalHealth / animalCount) : 100;
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
        
        const animalIds = ['chicken', 'cow', 'sheep', 'pig', 'duck', 'goat', 'rabbit', 'horse'];
        let statusHtml = `
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
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
            </div>
        `;
        
        // 添加动物状态详情
        let animalStatusHtml = '<div class="space-y-2">';
        animalIds.forEach(animalId => {
            const count = this.animals[animalId] || 0;
            if (count === 0) return;
            
            const health = this.animalHealth[animalId] || 0;
            const stress = this.animalStress[animalId] || 0;
            const water = this.animalWaterSupply[animalId] || 100;
            const shelter = this.animalShelter[animalId] || false;
            const injuries = this.animalInjuries[animalId] || [];
            
            let statusClass = 'bg-green-50 border-green-400';
            let statusText = '状态良好';
            
            if (health < 50 || stress > 70 || water < 30) {
                statusClass = 'bg-red-50 border-red-400';
                statusText = '需要关注';
            } else if (health < 80 || stress > 40 || water < 60) {
                statusClass = 'bg-yellow-50 border-yellow-400';
                statusText = '状态一般';
            }
            
            animalStatusHtml += `
                <div class="${statusClass} border-l-4 p-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <span class="text-xl mr-2">${this.getAnimalIcon(animalId)}</span>
                            <div>
                                <div class="font-semibold">${this.getAnimalName(animalId)} ×${count}</div>
                                <div class="text-sm text-gray-600">${statusText}</div>
                            </div>
                        </div>
                        <div class="text-right text-sm">
                            <div class="flex items-center gap-2">
                                <span>健康: ${health.toFixed(2)}%</span>
                                <span>压力: ${stress}%</span>
                                <span>水分: ${water}%</span>
                            </div>
                            <div class="flex items-center gap-2 mt-1">
                                <span>庇护: ${shelter ? '✅' : '❌'}</span>
                                <span>伤病: ${injuries.length}</span>
                            </div>
                        </div>
                    </div>
                    ${injuries.length > 0 ? `
                        <div class="mt-2 text-xs text-red-600">
                            伤病记录: ${injuries.map(injury => 
                                `${injury.type}(${injury.severity}级)`
                            ).join(', ')}
                        </div>
                    ` : ''}
                    <div class="mt-2">
                        <button class="weather-item-btn bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs" data-animal-id="${animalId}">
                            使用道具
                        </button>
                    </div>
                </div>
            `;
        });
        animalStatusHtml += '</div>';
        
        statusBox.innerHTML = statusHtml + animalStatusHtml;
        
        // 绑定天气行动按钮
        document.querySelectorAll('.weather-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.executeWeatherAction(action);
            });
        });
        
        // 绑定天气状态面板中的道具使用按钮
        statusBox.querySelectorAll('.weather-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const animalId = btn.getAttribute('data-animal-id');
                this.showAnimalItemMenu(animalId);
            });
        });
    }

    // 执行天气应对行动
    executeWeatherAction(action) {
        this.showNotification(`执行行动: ${action}`, 'info');
        // 这里可以根据具体行动执行相应的逻辑
    }

    // 显示动物道具菜单
    showAnimalItemMenu(animalId) {
        this.showNotification(`为${this.getAnimalName(animalId)}使用道具`, 'info');
        // 这里可以显示道具使用界面
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
}

// 创建全局牧场模块实例
window.ranchModule = new RanchModule(); 
