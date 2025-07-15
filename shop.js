// 商店模块 - 管理农场商店的所有功能
class ShopModule {
    constructor(gameState) {
        this.gameState = gameState;
        this.initializeShopData();
    }

    // 初始化商店数据
    initializeShopData() {
        // 种子数据
        this.seeds = [
            // 中国东北
            { id: 'soybean', name: '大豆', price: 10, growTime: 30, sellPrice: 20, xp: 5, icon: '🌱', color: 'bg-lime-100', regions: ['north_china'] },
            { id: 'millet', name: '小米', price: 12, growTime: 36, sellPrice: 22, xp: 6, icon: '🌾', color: 'bg-yellow-200', regions: ['north_china'] },
            { id: 'sorghum', name: '高粱', price: 15, growTime: 45, sellPrice: 30, xp: 8, icon: '🌾', color: 'bg-red-200', regions: ['north_china'] },
            { id: 'potato', name: '土豆', price: 20, growTime: 60, sellPrice: 45, xp: 12, icon: '🥔', color: 'bg-amber-100', regions: ['north_china'] },
            { id: 'corn', name: '玉米', price: 18, growTime: 54, sellPrice: 38, xp: 10, icon: '🌽', color: 'bg-yellow-100', regions: ['north_china'] },
            // 中国华南
            { id: 'lychee', name: '荔枝', price: 22, growTime: 66, sellPrice: 50, xp: 13, icon: '🥭', color: 'bg-pink-100', regions: ['south_china'] },
            { id: 'banana', name: '香蕉', price: 25, growTime: 75, sellPrice: 60, xp: 15, icon: '🍌', color: 'bg-yellow-200', regions: ['south_china'] },
            { id: 'sugarcane', name: '甘蔗', price: 20, growTime: 60, sellPrice: 48, xp: 12, icon: '🎋', color: 'bg-green-200', regions: ['south_china'] },
            { id: 'pineapple', name: '菠萝', price: 28, growTime: 84, sellPrice: 70, xp: 18, icon: '🍍', color: 'bg-amber-200', regions: ['south_china'] },
            { id: 'dragonfruit', name: '火龙果', price: 35, growTime: 105, sellPrice: 90, xp: 22, icon: '🐉', color: 'bg-pink-200', regions: ['south_china'] },
            // 中国华东
            { id: 'rice', name: '水稻', price: 15, growTime: 45, sellPrice: 32, xp: 9, icon: '🌾', color: 'bg-green-200', regions: ['east_china'] },
            { id: 'peanut', name: '花生', price: 18, growTime: 54, sellPrice: 38, xp: 10, icon: '🥜', color: 'bg-yellow-300', regions: ['east_china'] },
            { id: 'rapeseed', name: '油菜', price: 16, growTime: 48, sellPrice: 34, xp: 9, icon: '🌻', color: 'bg-yellow-100', regions: ['east_china'] },
            { id: 'lotus', name: '莲藕', price: 22, growTime: 66, sellPrice: 50, xp: 13, icon: '🌸', color: 'bg-pink-100', regions: ['east_china'] },
            { id: 'tea', name: '茶叶', price: 30, growTime: 90, sellPrice: 80, xp: 20, icon: '🍃', color: 'bg-green-100', regions: ['east_china'] },
            // 中国西部
            { id: 'walnut', name: '核桃', price: 25, growTime: 75, sellPrice: 60, xp: 15, icon: '🌰', color: 'bg-amber-200', regions: ['west_china'] },
            { id: 'apple', name: '苹果', price: 20, growTime: 60, sellPrice: 48, xp: 12, icon: '🍎', color: 'bg-red-100', regions: ['west_china'] },
            { id: 'grape', name: '葡萄', price: 28, growTime: 84, sellPrice: 70, xp: 18, icon: '🍇', color: 'bg-purple-100', regions: ['west_china'] },
            { id: 'apricot', name: '杏', price: 18, growTime: 54, sellPrice: 38, xp: 10, icon: '🍑', color: 'bg-orange-100', regions: ['west_china'] },
            { id: 'melon', name: '哈密瓜', price: 35, growTime: 105, sellPrice: 90, xp: 22, icon: '🍈', color: 'bg-green-100', regions: ['west_china'] },
            // 日本
            { id: 'wasabi', name: '芥末', price: 30, growTime: 90, sellPrice: 80, xp: 20, icon: '🌱', color: 'bg-lime-100', regions: ['japan'] },
            { id: 'sakura', name: '樱花', price: 40, growTime: 120, sellPrice: 100, xp: 25, icon: '🌸', color: 'bg-pink-200', regions: ['japan'] },
            { id: 'sweet_potato', name: '红薯', price: 18, growTime: 54, sellPrice: 38, xp: 10, icon: '🍠', color: 'bg-orange-200', regions: ['japan'] },
            { id: 'daikon', name: '大根', price: 22, growTime: 66, sellPrice: 50, xp: 13, icon: '🥕', color: 'bg-orange-100', regions: ['japan'] },
            { id: 'mikan', name: '蜜柑', price: 28, growTime: 84, sellPrice: 70, xp: 18, icon: '🍊', color: 'bg-yellow-100', regions: ['japan'] },
            // 美国中部
            { id: 'blueberry', name: '蓝莓', price: 25, growTime: 75, sellPrice: 60, xp: 15, icon: '🫐', color: 'bg-indigo-100', regions: ['us_midwest'] },
            { id: 'pumpkin', name: '南瓜', price: 20, growTime: 60, sellPrice: 48, xp: 12, icon: '🎃', color: 'bg-orange-200', regions: ['us_midwest'] },
            { id: 'wheat', name: '小麦', price: 15, growTime: 45, sellPrice: 32, xp: 9, icon: '🌾', color: 'bg-yellow-100', regions: ['us_midwest'] },
            { id: 'cranberry', name: '蔓越莓', price: 28, growTime: 84, sellPrice: 70, xp: 18, icon: '🍒', color: 'bg-red-200', regions: ['us_midwest'] },
            { id: 'sunflower', name: '向日葵', price: 18, growTime: 54, sellPrice: 38, xp: 10, icon: '🌻', color: 'bg-yellow-200', regions: ['us_midwest'] },
            // 欧洲
            { id: 'carrot', name: '胡萝卜', price: 15, growTime: 45, sellPrice: 32, xp: 9, icon: '🥕', color: 'bg-orange-100', regions: ['europe'] },
            { id: 'strawberry', name: '草莓', price: 22, growTime: 66, sellPrice: 50, xp: 13, icon: '🍓', color: 'bg-red-100', regions: ['europe'] },
            { id: 'lettuce', name: '生菜', price: 18, growTime: 54, sellPrice: 38, xp: 10, icon: '🥬', color: 'bg-green-100', regions: ['europe'] },
            { id: 'asparagus', name: '芦笋', price: 28, growTime: 84, sellPrice: 70, xp: 18, icon: '🥦', color: 'bg-green-200', regions: ['europe'] },
            { id: 'grapefruit', name: '葡萄柚', price: 35, growTime: 105, sellPrice: 90, xp: 22, icon: '🍇', color: 'bg-purple-100', regions: ['europe'] }
        ];

        // 道具数据
        this.items = [
            { id: 'pesticide', name: '农药', price: 10, desc: '清除虫害', icon: '🧪' },
            { id: 'medicine', name: '药剂', price: 15, desc: '治愈病害', icon: '💊' },
            { id: 'weedkiller', name: '除草剂', price: 8, desc: '清除杂草', icon: '🌿' },
            { id: 'insulation', name: '保温布', price: 12, desc: '抵御霜冻', icon: '🧣' },
            // 动物相关道具
            { id: 'animal_feed', name: '高级饲料', price: 25, desc: '提升动物健康度和产出', icon: '🌾', animalItem: true },
            { id: 'vitamin_pill', name: '维生素丸', price: 30, desc: '快速恢复动物健康', icon: '💊', animalItem: true },
            { id: 'stress_relief_pill', name: '安抚药丸', price: 20, desc: '降低动物压力值', icon: '😌', animalItem: true },
            { id: 'water_supplement', name: '水分补充剂', price: 18, desc: '快速补充动物水分', icon: '💧', animalItem: true },
            { id: 'healing_ointment', name: '治疗药膏', price: 35, desc: '治疗动物伤病', icon: '🩹', animalItem: true },
            { id: 'happiness_treat', name: '幸福零食', price: 15, desc: '提升动物幸福值', icon: '🍪', animalItem: true },
            { id: 'weather_protection', name: '天气防护剂', price: 40, desc: '临时抵御恶劣天气影响', icon: '🛡️', animalItem: true },
            { id: 'growth_hormone', name: '生长激素', price: 50, desc: '提升动物产出效率', icon: '📈', animalItem: true }
        ];

        // 装饰品数据
        this.decors = [
            // 天气应对设施 (动物相关)
            { id: 'shelter', name: '动物庇护所', price: 150, desc: '为动物提供庇护，减少恶劣天气影响', icon: '🏠', weatherProtection: true },
            { id: 'water_system', name: '自动饮水系统', price: 120, desc: '自动为动物补充水分', icon: '💧', weatherProtection: true },
            { id: 'cooling_system', name: '降温系统', price: 100, desc: '在炎热天气为动物降温', icon: '❄️', weatherProtection: true },
            { id: 'medical_kit', name: '医疗箱', price: 200, desc: '治疗动物伤病，恢复健康', icon: '🏥', weatherProtection: true },
            { id: 'stress_relief', name: '安抚设施', price: 80, desc: '安抚动物，降低压力值', icon: '🎵', weatherProtection: true },
            { id: 'activity_zone', name: '活动区', price: 90, desc: '提升动物幸福值', icon: '🎪', weatherProtection: true },
            { id: 'chicken_fence', name: '鸡圈栅栏段', price: 15, desc: '为鸡圈添加一段栅栏，买8段可围成完整围栏', icon: '🔳', weatherProtection: true, animalType: 'chicken' },
            { id: 'cow_fence', name: '牛棚栅栏段', price: 20, desc: '为牛棚添加一段栅栏，买8段可围成完整围栏', icon: '🔳', weatherProtection: true, animalType: 'cow' },
            { id: 'sheep_fence', name: '羊圈栅栏段', price: 18, desc: '为羊圈添加一段栅栏，买8段可围成完整围栏', icon: '🔳', weatherProtection: true, animalType: 'sheep' },
            { id: 'pig_fence', name: '猪圈栅栏段', price: 19, desc: '为猪圈添加一段栅栏，买8段可围成完整围栏', icon: '🔳', weatherProtection: true, animalType: 'pig' },
            { id: 'duck_fence', name: '鸭园栅栏段', price: 16, desc: '为鸭园添加一段栅栏，买8段可围成完整围栏', icon: '🔳', weatherProtection: true, animalType: 'duck' },
            { id: 'goat_fence', name: '山羊圈栅栏段', price: 22, desc: '为山羊圈添加一段栅栏，买8段可围成完整围栏', icon: '🔳', weatherProtection: true, animalType: 'goat' },
            { id: 'rabbit_fence', name: '兔园栅栏段', price: 12, desc: '为兔园添加一段栅栏，买8段可围成完整围栏', icon: '🔳', weatherProtection: true, animalType: 'rabbit' },
            { id: 'horse_fence', name: '马厩栅栏段', price: 25, desc: '为马厩添加一段栅栏，买8段可围成完整围栏', icon: '🔳', weatherProtection: true, animalType: 'horse' },
            // 植物保护设施
            { id: 'irrigation_system', name: '灌溉系统', price: 180, desc: '自动为植物浇水，抵御干旱', icon: '💧', plantProtection: true },
            { id: 'greenhouse', name: '温室大棚', price: 250, desc: '保护植物免受恶劣天气影响', icon: '🏠', plantProtection: true },
            { id: 'shade_net', name: '遮阳网', price: 120, desc: '在炎热天气为植物遮阳', icon: '🌿', plantProtection: true },
            { id: 'wind_break', name: '防风林', price: 150, desc: '保护植物免受强风影响', icon: '🌳', plantProtection: true },
            { id: 'frost_protection', name: '防霜设施', price: 200, desc: '保护植物免受霜冻伤害', icon: '❄️', plantProtection: true },
            { id: 'pest_control', name: '虫害防治系统', price: 160, desc: '自动防治植物病虫害', icon: '🕷️', plantProtection: true }
        ];
    }

    // 初始化商店事件监听
    init() {
        this.setupShopTabSwitching();
        this.renderAllShops();
    }

    // 根据ID获取种子信息
    getSeedById(seedId) {
        return this.seeds.find(seed => seed.id === seedId);
    }

    // 根据当前地区获取种子
    getRegionSeeds(region) {
        return this.seeds.filter(seed => seed.regions.includes(region));
    }

    // 渲染种子商店
    renderSeedShop() {
        const shopItems = document.getElementById('shop-items');
        if (!shopItems) return;

        const regionSeeds = this.getRegionSeeds(this.gameState.currentRegion);
        
        shopItems.innerHTML = regionSeeds.map(seed => `
            <div class="seed-item flex items-center gap-2 p-3 ${seed.color} border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition" data-seed-id="${seed.id}">
                <span class="text-3xl">${seed.icon}</span>
                <div class="flex-1">
                    <div class="font-bold text-lg">${seed.name}</div>
                    <div class="text-sm text-gray-600">售价: ${seed.sellPrice}金币 | 经验: ${seed.xp}</div>
                    <div class="text-sm text-gray-500">生长时间: ${seed.growTime}分钟</div>
                    <div class="text-sm text-blue-600">库存: ${this.gameState.purchasedSeeds[seed.id] || 0}</div>
                </div>
                <div class="text-right">
                    <div class="text-xl font-bold text-green-700">${seed.price}金币</div>
                    <button class="buy-btn btn-strong px-4 py-2 text-base" data-seed-id="${seed.id}">
                        <i class="fas fa-shopping-cart mr-2"></i> 购买
                    </button>
                </div>
            </div>
        `).join('');

        // 添加购买按钮事件
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const seedId = btn.getAttribute('data-seed-id');
                this.buySeed(seedId);
            });
        });

        // 添加种子选择事件
        document.querySelectorAll('.seed-item').forEach(item => {
            item.addEventListener('click', () => {
                const seedId = item.getAttribute('data-seed-id');
                this.selectSeed(seedId);
            });
        });
    }

    // 渲染道具商店
    renderItemShop() {
        const shop = document.getElementById('item-shop');
        if (!shop) return;

        shop.innerHTML = this.items.map(item => `
            <div class="flex items-center gap-2 p-2 rounded ${item.animalItem ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'} shadow-sm">
                <span class="text-2xl">${item.icon}</span>
                <div class="flex-1">
                    <div class="font-bold">${item.name}</div>
                    <div class="text-xs text-gray-500">${item.desc}</div>
                    ${item.animalItem ? '<div class="text-xs text-blue-600 font-semibold">动物专用道具</div>' : ''}
                </div>
                <div class="text-right">
                    <div class="text-sm text-green-700">库存: ${this.gameState.items[item.id] || 0}</div>
                    <button class="buy-item ${item.animalItem ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white px-2 py-1 rounded text-sm" data-item-id="${item.id}">购买(${item.price}金币)</button>
                </div>
            </div>
        `).join('');

        shop.querySelectorAll('.buy-item').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-item-id');
                this.buyItem(id);
            };
        });
    }

    // 渲染装饰商店
    renderDecorShop() {
        const plantDecorList = document.getElementById('plant-decor-list');
        const animalDecorList = document.getElementById('animal-decor-list');
        if (!plantDecorList || !animalDecorList) return;

        // 分离植物和动物装饰
        const plantDecors = this.decors.filter(decor => decor.plantProtection);
        const animalDecors = this.decors.filter(decor => decor.weatherProtection);

        // 渲染植物装饰
        plantDecorList.innerHTML = plantDecors.map(decor => `
            <div class="flex items-center gap-2 p-2 rounded bg-green-50 border-l-4 border-green-500 shadow-sm">
                <span class="text-2xl">${decor.icon}</span>
                <div class="flex-1">
                    <div class="font-bold">${decor.name}</div>
                    <div class="text-xs text-gray-500">${decor.desc}</div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-green-700">库存: ${this.gameState.decors[decor.id] || 0}</div>
                    <button class="buy-decor bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm" data-decor-id="${decor.id}">购买(${decor.price}金币)</button>
                </div>
            </div>
        `).join('');

        // 渲染动物装饰
        animalDecorList.innerHTML = animalDecors.map(decor => {
            const currentCount = this.gameState.decors[decor.id] || 0;
            let stockText = `库存: ${currentCount}`;
            let buttonText = `购买(${decor.price}金币)`;
            let buttonClass = "bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm";
            
            // 如果是栅栏段，显示特殊的信息
            if (decor.animalType) {
                stockText = `已购买: ${currentCount}/8段`;
                if (currentCount >= 8) {
                    buttonText = '已围成完整围栏';
                    buttonClass = "bg-gray-400 text-white px-2 py-1 rounded text-sm cursor-not-allowed";
                }
            }
            
            return `
                <div class="flex items-center gap-2 p-2 rounded bg-blue-50 border-l-4 border-blue-500 shadow-sm">
                    <span class="text-2xl">${decor.icon}</span>
                    <div class="flex-1">
                        <div class="font-bold">${decor.name}</div>
                        <div class="text-xs text-gray-500">${decor.desc}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-green-700">${stockText}</div>
                        <button class="buy-decor ${buttonClass}" data-decor-id="${decor.id}" ${decor.animalType && currentCount >= 8 ? 'disabled' : ''}>${buttonText}</button>
                    </div>
                </div>
            `;
        }).join('');

        // 绑定购买事件
        document.querySelectorAll('.buy-decor').forEach(btn => {
            btn.onclick = () => {
                if (btn.disabled) return;
                const id = btn.getAttribute('data-decor-id');
                this.buyDecor(id);
            };
        });
    }

    // 渲染动物商店
    renderAnimalShop() {
        const animalShop = document.getElementById('animal-shop');
        if (!animalShop) return;
        // 动物数据
        const animals = [
            { id: 'chicken', name: '鸡', icon: '🐔', price: 60, desc: '产蛋' },
            { id: 'cow', name: '奶牛', icon: '🐄', price: 200, desc: '产奶' },
            { id: 'sheep', name: '绵羊', icon: '🐑', price: 120, desc: '产羊毛' },
            { id: 'pig', name: '猪', icon: '🐷', price: 180, desc: '产猪肉' },
            { id: 'duck', name: '鸭子', icon: '🦆', price: 80, desc: '产鸭蛋' },
            { id: 'goat', name: '山羊', icon: '🐐', price: 150, desc: '产羊奶' },
            { id: 'rabbit', name: '兔子', icon: '🐰', price: 300, desc: '产兔毛' },
            { id: 'horse', name: '马', icon: '🐎', price: 500, desc: '产马粪' }
        ];
        animalShop.innerHTML = animals.map(animal => `
            <div class="flex items-center gap-3 p-3 rounded-lg bg-white border-l-4 border-green-400 shadow-sm mb-2">
                <span class="text-3xl">${animal.icon}</span>
                <div class="flex-1">
                    <div class="font-bold text-lg">${animal.name}</div>
                    <div class="text-sm text-gray-500">${animal.desc}</div>
                </div>
                <div class="text-right">
                    <div class="text-xl font-bold text-yellow-600">${animal.price}金币</div>
                    <button class="buy-animal-btn btn-strong px-4 py-2 text-base" data-animal-id="${animal.id}" data-animal-price="${animal.price}">
                        <i class="fas fa-shopping-cart mr-2"></i> 购买
                    </button>
                </div>
            </div>
        `).join('');
        // 绑定购买事件
        animalShop.querySelectorAll('.buy-animal-btn').forEach(btn => {
            btn.onclick = () => {
                const animalId = btn.getAttribute('data-animal-id');
                const price = parseInt(btn.getAttribute('data-animal-price'));
                if (window.ranchModule) {
                    window.ranchModule.buyAnimal(animalId, price);
                }
            };
        });
    }

    // 购买种子
    buySeed(seedId) {
        const seed = this.getSeedById(seedId);
        if (!seed) return;

        if (this.gameState.money >= seed.price) {
            this.gameState.money -= seed.price;

            if (!this.gameState.purchasedSeeds[seedId]) {
                this.gameState.purchasedSeeds[seedId] = 0;
            }
            this.gameState.purchasedSeeds[seedId]++;

            this.updateUI();
            this.renderSeedShop();
            this.showNotification(`成功购买 ${seed.name} 种子!`, 'success');
            this.saveGameData();
        } else {
            this.showNotification('金币不足!', 'error');
        }
    }

    // 选择种子
    selectSeed(seedId) {
        const seed = this.getSeedById(seedId);
        if (!seed || !seed.regions.includes(this.gameState.currentRegion)) {
            this.showNotification('该种子不属于当前地区!', 'error');
            return;
        }

        // 检查是否已购买该种子
        if (!this.gameState.purchasedSeeds[seedId] || this.gameState.purchasedSeeds[seedId] <= 0) {
            this.showNotification('请先购买该种子!', 'error');
            return;
        }

        this.gameState.currentSelectedSeed = seedId;

        // 更新UI显示选中的种子
        document.querySelectorAll('.seed-item').forEach(item => {
            if (item.getAttribute('data-seed-id') === seedId) {
                item.classList.add('ring-2', 'ring-green-500');
            } else {
                item.classList.remove('ring-2', 'ring-green-500');
            }
        });

        this.showNotification(`已选择: ${seed.name}种子`, 'info');
    }

    // 购买道具
    buyItem(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        if (this.gameState.money < item.price) {
            this.showNotification('金币不足，无法购买', 'error');
            return;
        }

        this.gameState.money -= item.price;
        this.gameState.items[itemId] = (this.gameState.items[itemId] || 0) + 1;
        
        this.renderItemShop();
        this.renderMyItems();
        this.updateUI();
        this.saveGameData();
        this.showNotification(`购买${item.name}成功！`, 'success');
    }

    // 购买装饰
    buyDecor(decorId) {
        const decor = this.decors.find(d => d.id === decorId);
        if (!decor) return;

        // 检查栅栏是否已经购买满8段
        if (decor.animalType && (this.gameState.decors[decorId] || 0) >= 8) {
            this.showNotification('该动物区域栅栏已经围成完整围栏，无需再购买', 'warning');
            return;
        }

        if (this.gameState.money < decor.price) {
            this.showNotification('金币不足，无法购买', 'error');
            return;
        }

        this.gameState.money -= decor.price;
        this.gameState.decors[decorId] = (this.gameState.decors[decorId] || 0) + 1;

        // 如果购买的是栅栏，重新渲染对应的动物区域
        if (decor.animalType) {
            const fenceCount = this.gameState.decors[decorId];
            if (typeof renderAnimalArea === 'function') {
                renderAnimalArea(decor.animalType);
            }
            if (fenceCount >= 8) {
                this.showNotification(`购买${decor.name}成功！${decor.animalType}区域栅栏已围成完整围栏！`, 'success');
            } else {
                this.showNotification(`购买${decor.name}成功！当前已安装${fenceCount}/8段栅栏`, 'success');
            }
        } else {
            this.showNotification(`购买${decor.name}成功！`, 'success');
        }

        this.renderDecorShop();
        this.renderMyDecors();
        this.updateUI();
        this.saveGameData();
    }

    // 商店标签切换功能
    setupShopTabSwitching() {
        const tabButtons = document.querySelectorAll('.shop-tab-btn');
        const shopContents = document.querySelectorAll('.shop-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                // 移除所有按钮的active类
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // 隐藏所有内容区域
                shopContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });

                // 激活当前按钮
                button.classList.add('active');

                // 显示对应内容区域
                const targetContent = document.querySelector(`[id="${category === 'seeds' ? 'shop-items' : category === 'items' ? 'item-shop' : category === 'decor' ? 'decor-shop' : category === 'animals' ? 'animal-shop' : ''}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = 'block';
                }

                // 根据类别重新渲染对应的商店内容
                switch(category) {
                    case 'seeds':
                        this.renderSeedShop();
                        break;
                    case 'items':
                        this.renderItemShop();
                        break;
                    case 'decor':
                        this.renderDecorShop();
                        break;
                    case 'animals':
                        this.renderAnimalShop();
                        break;
                }
            });
        });
    }

    // 渲染所有商店
    renderAllShops() {
        this.renderSeedShop();
        this.renderItemShop();
        this.renderDecorShop();
    }

    // 辅助方法 - 显示通知
    showNotification(message, type) {
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            console.log(`${type}: ${message}`);
        }
    }

    // 辅助方法 - 更新UI
    updateUI() {
        if (typeof updateUI === 'function') {
            updateUI();
        }
    }

    // 辅助方法 - 保存游戏数据
    saveGameData() {
        if (typeof saveGameData === 'function') {
            saveGameData();
        }
    }

    // 辅助方法 - 渲染我的道具
    renderMyItems() {
        if (typeof renderMyItems === 'function') {
            renderMyItems();
        }
    }

    // 辅助方法 - 渲染我的装饰
    renderMyDecors() {
        if (typeof renderMyDecors === 'function') {
            renderMyDecors();
        }
    }
}

// 导出商店模块
if (typeof window !== 'undefined') {
    window.ShopModule = ShopModule;
} 
