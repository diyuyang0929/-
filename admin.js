// 超级管理员面板与功能脚本
(function(){
  // 依赖全局 gameState, randomEvents, showNotification, saveGameData, updateUI, renderFarm, renderWeather, renderShop, renderInventory, renderUpgrades, renderTasks, checkExpandFarmButton, regions, 以及ranchModule、fishingModule、shopModule等

  // 动态生成管理员按钮
  function ensureAdminButtons() {
    if (!document.getElementById('admin-open-btn')) {
      const btn = document.createElement('button');
      btn.id = 'admin-open-btn';
      btn.textContent = '管理员';
      btn.className = 'bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-1 text-sm rounded shadow fixed top-4 right-24 z-50';
      btn.style.display = 'none';
      document.body.appendChild(btn);
    }
    if (!document.getElementById('admin-grow-btn')) {
      const btn = document.createElement('button');
      btn.id = 'admin-grow-btn';
      btn.textContent = '立即完成生长';
      btn.className = 'bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-3 py-1 text-sm rounded shadow fixed top-4 right-4 z-50';
      btn.style.display = 'none';
      document.body.appendChild(btn);
    }
  }
  ensureAdminButtons();

  // 动态生成多Tab面板
  function renderAdminTabs() {
    const panel = document.getElementById('admin-panel');
    if (!panel) return;
    panel.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        <h2 class="text-2xl font-bold mb-4 text-green-700">超级管理员面板</h2>
        <div class="flex gap-2 mb-4">
          <button class="admin-tab-btn" data-tab="farm">农田/作物</button>
          <button class="admin-tab-btn" data-tab="ranch">牧场/动物</button>
          <button class="admin-tab-btn" data-tab="fishing">钓鱼</button>
          <button class="admin-tab-btn" data-tab="shop">商店/道具/装饰</button>
          <button class="admin-tab-btn" data-tab="task">任务/活动/成就</button>
          <button class="admin-tab-btn" data-tab="inventory">库存/背包</button>
          <button class="admin-tab-btn" data-tab="user">用户数据</button>
        </div>
        <div id="admin-tab-content"></div>
        <button id="admin-close" class="mt-6 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-bold self-end">关闭</button>
      </div>
    `;
    // 绑定tab切换
    panel.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.onclick = function() {
        panel.querySelectorAll('.admin-tab-btn').forEach(b=>b.classList.remove('bg-green-500','text-white'));
        btn.classList.add('bg-green-500','text-white');
        renderAdminTabContent(btn.dataset.tab);
      };
    });
    // 默认显示第一个tab
    panel.querySelector('.admin-tab-btn').click();
    // 关闭按钮
    panel.querySelector('#admin-close').onclick = function() {
      panel.style.display = 'none';
    };
  }

  // 各Tab内容渲染（结构+批量操作+单项修改+导入导出）
  function renderAdminTabContent(tab) {
    const content = document.getElementById('admin-tab-content');
    if (!content) return;
    switch(tab) {
      case 'farm':
        content.innerHTML = renderFarmAdmin();
        bindFarmAdminEvents();
        break;
      case 'ranch':
        content.innerHTML = renderRanchAdmin();
        bindRanchAdminEvents();
        break;
      case 'fishing':
        content.innerHTML = renderFishingAdmin();
        bindFishingAdminEvents();
        break;
      case 'shop':
        content.innerHTML = renderShopAdmin();
        bindShopAdminEvents();
        break;
      case 'task':
        content.innerHTML = renderTaskAdmin();
        bindTaskAdminEvents();
        break;
      case 'inventory':
        content.innerHTML = renderInventoryAdmin();
        bindInventoryAdminEvents();
        break;
      case 'user':
        content.innerHTML = renderUserAdmin();
        bindUserAdminEvents();
        break;
    }
  }

  // 下面各renderXXXAdmin/bindXXXAdminEvents函数请根据现有全局变量和模块自动适配（这里只写结构和主逻辑，细节可后续补充）
  function renderFarmAdmin() {
    // 获取全局shopModule和weatherTypes
    const seeds = (window.shopModule && shopModule.seeds) ? shopModule.seeds : [];
    const weatherTypes = window.weatherTypes || [];
    const randomEvents = window.randomEvents || [];
    let html = `<div class="space-y-2">
      <h3 class="font-bold text-lg mb-2">农田/作物管理</h3>
      <div class="mb-2 flex flex-wrap gap-2">
        <button id="admin-farm-mature" class="btn-admin">一键成熟</button>
        <button id="admin-farm-clear" class="btn-admin">一键清空</button>
        <button id="admin-farm-expand" class="btn-admin">扩展农田</button>
        <button id="admin-farm-upgrade" class="btn-admin">升级全部农田</button>
      </div>
      <div class="mb-2">
        <input id="admin-farm-plant-id" placeholder="作物ID" class="border px-2 py-1 rounded ml-2" style="width:120px;">
        <button id="admin-farm-plant-btn" class="btn-admin">一键种植指定作物</button>
      </div>
      <div class="mb-2">
        <span class="font-bold">所有作物：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${seeds.map(seed => `<button class="btn-admin" data-seed-plant="${seed.id}">${seed.icon||''}${seed.name}</button>`).join('')}
        </div>
      </div>
      <div class="mb-2">
        <span class="font-bold">切换天气：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${weatherTypes.map(w => `<button class="btn-admin" data-weather-set="${w.id}">${w.icon||''}${w.name}</button>`).join('')}
        </div>
      </div>
      <div class="mb-2">
        <span class="font-bold">特殊天气事件：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${(Array.isArray(randomEvents) ? randomEvents : []).filter((e,i,arr)=>e && arr.findIndex(ev=>ev.id===e.id)===i).map(e => `<button class="btn-admin" data-event-trigger="${e.id}">${e.icon||''}${e.name}</button><button class="btn-admin" data-event-clear="${e.id}">清空${e.name}</button>`).join('')}
        </div>
      </div>
    </div>`;
    // 渲染后立即绑定事件，确保每次刷新都可点击
    setTimeout(bindFarmAdminEvents, 0);
    return html;
  }
  function bindFarmAdminEvents() {
    // 一键成熟
    const matureBtn = document.getElementById('admin-farm-mature');
    if (matureBtn) matureBtn.onclick = function() {
      if(window.gameState && window.gameState.farmData){
        window.gameState.farmData.forEach(plot => {
          if (plot.state === 'planted') {
            plot.progress = plot.growthTime * 60;
            plot.growth = 'completed';
          }
        });
        renderFarm&&renderFarm();saveGameData&&saveGameData();showNotification('所有作物已立即成熟！', 'success');
      }
    };
    // 一键清空
    const clearBtn = document.getElementById('admin-farm-clear');
    if (clearBtn) clearBtn.onclick = function() {
      if(window.gameState && window.gameState.farmData){
        window.gameState.farmData.forEach(plot => {
          plot.state = 'empty';plot.seedId = null;plot.growth = null;plot.progress = 0;plot.growthTime = 0;
        });
        renderFarm&&renderFarm();saveGameData&&saveGameData();showNotification('所有农田已清空！', 'success');
      }
    };
    // 扩展农田
    const expandBtn = document.getElementById('admin-farm-expand');
    if (expandBtn) expandBtn.onclick = function() {
      if(window.gameState && typeof expandFarm === 'function'){
        expandFarm();showNotification('已扩展农田', 'success');
      }
    };
    // 升级全部农田
    const upgradeBtn = document.getElementById('admin-farm-upgrade');
    if (upgradeBtn) upgradeBtn.onclick = function() {
      if(window.gameState && typeof upgradeAllFarm === 'function'){
        upgradeAllFarm();showNotification('已升级全部农田', 'success');
      }
    };
    // 一键种植指定作物
    const plantBtn = document.getElementById('admin-farm-plant-btn');
    if (plantBtn) plantBtn.onclick = function() {
      const id = document.getElementById('admin-farm-plant-id')?.value;
      if(window.gameState && window.gameState.farmData && id){
        window.gameState.farmData.forEach(plot => {
          plot.state = 'planted';plot.seedId = id;plot.growth = 'growing';plot.progress = 0;plot.growthTime = 30;
        });
        renderFarm&&renderFarm();saveGameData&&saveGameData();showNotification('已全部种植：'+id, 'success');
      }
    };
    // 所有作物按钮
    document.querySelectorAll('button[data-seed-plant]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-seed-plant');
        if(window.gameState && window.gameState.farmData && id){
          window.gameState.farmData.forEach(plot => {
            plot.state = 'planted';plot.seedId = id;plot.growth = 'growing';plot.progress = 0;plot.growthTime = 30;
          });
          renderFarm&&renderFarm();saveGameData&&saveGameData();showNotification('已全部种植：'+id, 'success');
        }
      };
    });
    // 切换天气按钮
    document.querySelectorAll('button[data-weather-set]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-weather-set');
        if(window.gameState){window.gameState.weather = id;renderWeather&&renderWeather();saveGameData&&saveGameData();showNotification('已切换天气：'+id, 'success');}
      };
    });
    // 特殊天气事件一键触发/清空
    document.querySelectorAll('button[data-event-trigger]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-event-trigger');
        if (window.triggerAdminWeatherEvent) {
          window.triggerAdminWeatherEvent(id);
        } else {
          // fallback 并弹窗提示
          const event = (window.randomEvents||[]).find(e=>e.id===id);
          if(window.gameState && event){
            const affectedIndexes = window.gameState.farmData.map((p,i)=>p.state==='planted'?i:null).filter(i=>i!==null);
            const now = Date.now();
            const eventObj = { ...event, affectedPlots: affectedIndexes, startTime: now };
            window.gameState.activeEvents.push(eventObj);
            window.gameState.lastEventTime = now;
            showNotification(`已触发事件（无统一弹窗）：${event.icon||''}${event.name}`,'info');
            saveGameData&&saveGameData();
          } else {
            showNotification('事件触发失败，randomEvents未定义或无效','error');
          }
        }
      };
    });
    document.querySelectorAll('button[data-event-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-event-clear');
        if(window.gameState && window.gameState.activeEvents){
          window.gameState.activeEvents = window.gameState.activeEvents.filter(e=>e.id!==id);
          showNotification('已清空事件：'+id,'success');
          saveGameData&&saveGameData();
        }
      };
    });
  }
  function renderRanchAdmin() {
    // 获取全局动物类型
    const animalDict = (window.ranchModule && ranchModule.animals) ? ranchModule.animals : { chicken: 0, cow: 0, sheep: 0, pig: 0, duck: 0, goat: 0, rabbit: 0, horse: 0 };
    const animalList = Object.keys(animalDict);
    // 动物icon和名称
    const animalMeta = {
      chicken: { name: '鸡', icon: '🐔' },
      cow: { name: '牛', icon: '🐮' },
      sheep: { name: '羊', icon: '🐑' },
      pig: { name: '猪', icon: '🐷' },
      duck: { name: '鸭', icon: '🦆' },
      goat: { name: '山羊', icon: '🐐' },
      rabbit: { name: '兔子', icon: '🐰' },
      horse: { name: '马', icon: '🐴' }
    };
    let html = `<div class="space-y-2">
      <h3 class="font-bold text-lg mb-2">牧场/动物管理</h3>
      <div class="mb-2 flex flex-wrap gap-2">
        <button id="admin-ranch-full-health" class="btn-admin">动物全满健康</button>
      </div>
      <div class="mb-2">
        <span class="font-bold">所有动物：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${animalList.map(id => `
            <button class="btn-admin" data-animal-add="${id}" title="加满">${animalMeta[id]?.icon||''}加${animalMeta[id]?.name||id}</button>
            <button class="btn-admin" data-animal-clear="${id}" title="清空">${animalMeta[id]?.icon||''}清${animalMeta[id]?.name||id}</button>
          `).join('')}
        </div>
      </div>
    </div>`;
    return html;
  }
  function bindRanchAdminEvents() {
    document.getElementById('admin-ranch-full-health').onclick = function() {
      if(window.ranchModule && ranchModule.animalHealth){Object.keys(ranchModule.animalHealth).forEach(id=>{ranchModule.animalHealth[id]=100;});}
      renderFarm();saveGameData();showNotification('动物状态已满','success');
    };
    // 动物加满/清空按钮
    document.querySelectorAll('button[data-animal-add]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-animal-add');
        if(window.ranchModule && ranchModule.animals){ranchModule.animals[id]=99;}
        renderFarm();saveGameData();showNotification('已加满：'+id,'success');
      };
    });
    document.querySelectorAll('button[data-animal-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-animal-clear');
        if(window.ranchModule && ranchModule.animals){ranchModule.animals[id]=0;}
        renderFarm();saveGameData();showNotification('已清空：'+id,'success');
      };
    });
  }
  function renderFishingAdmin() {
    // 获取全局鱼类数据
    const fishData = (window.fishingModule && fishingModule.fishData) ? fishingModule.fishData : {
      carp: { name: '鲤鱼', icon: '🐟' }, bass: { name: '鲈鱼', icon: '🐟' }, catfish: { name: '鲶鱼', icon: '🐟' }, trout: { name: '鳟鱼', icon: '🐟' }, salmon: { name: '三文鱼', icon: '🐟' }, pike: { name: '梭子鱼', icon: '🐟' }, perch: { name: '鲈鱼', icon: '🐟' }, walleye: { name: '白斑狗鱼', icon: '🐟' }, tuna: { name: '金枪鱼', icon: '🐟' }, mackerel: { name: '鲭鱼', icon: '🐟' }, cod: { name: '鳕鱼', icon: '🐟' }
    };
    const fishList = Object.keys(fishData);
    let html = `<div class="space-y-2">
      <h3 class="font-bold text-lg mb-2">钓鱼管理</h3>
      <div class="mb-2">
        <span class="font-bold">所有鱼类：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${fishList.map(id => `
            <button class="btn-admin" data-fish-add="${id}" title="获得">${fishData[id].icon||''}加${fishData[id].name||id}</button>
            <button class="btn-admin" data-fish-clear="${id}" title="清空">${fishData[id].icon||''}清${fishData[id].name||id}</button>
          `).join('')}
        </div>
      </div>
    </div>`;
    return html;
  }
  function bindFishingAdminEvents() {
    // 鱼类加满/清空按钮
    document.querySelectorAll('button[data-fish-add]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-fish-add');
        if(window.fishingModule && fishingModule.caughtFish){fishingModule.caughtFish[id]=99;}
        if(window.fishingModule && fishingModule.fishInventory){
          const idx = fishingModule.fishInventory.findIndex(f=>f.id===id);
          if(idx===-1) fishingModule.fishInventory.push({id, count:99});
          else fishingModule.fishInventory[idx].count=99;
        }
        saveGameData();showNotification('已获得：'+id,'success');
      };
    });
    document.querySelectorAll('button[data-fish-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-fish-clear');
        if(window.fishingModule && fishingModule.caughtFish){fishingModule.caughtFish[id]=0;}
        if(window.fishingModule && fishingModule.fishInventory){
          const idx = fishingModule.fishInventory.findIndex(f=>f.id===id);
          if(idx!==-1) fishingModule.fishInventory[idx].count=0;
        }
        saveGameData();showNotification('已清空：'+id,'success');
      };
    });
  }
  function renderShopAdmin() {
    // 获取全局道具和装饰
    const items = (window.shopModule && shopModule.items) ? shopModule.items : [];
    const decors = (window.shopModule && shopModule.decors) ? shopModule.decors : [];
    let html = `<div class="space-y-2">
      <h3 class="font-bold text-lg mb-2">商店/道具/装饰管理</h3>
      <div class="mb-2">
        <span class="font-bold">所有道具：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${items.map(item => `
            <button class="btn-admin" data-item-add="${item.id}" title="获得">${item.icon||''}加${item.name}</button>
            <button class="btn-admin" data-item-clear="${item.id}" title="清空">${item.icon||''}清${item.name}</button>
          `).join('')}
        </div>
      </div>
      <div class="mb-2">
        <span class="font-bold">所有装饰：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${decors.map(decor => `
            <button class="btn-admin" data-decor-add="${decor.id}" title="获得">${decor.icon||''}加${decor.name}</button>
            <button class="btn-admin" data-decor-clear="${decor.id}" title="清空">${decor.icon||''}清${decor.name}</button>
          `).join('')}
        </div>
      </div>
    </div>`;
    return html;
  }
  function bindShopAdminEvents() {
    // 道具加满/清空按钮
    document.querySelectorAll('button[data-item-add]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-item-add');
        if(gameState.items){gameState.items[id]=99;}
        saveGameData();showNotification('已获得：'+id,'success');
      };
    });
    document.querySelectorAll('button[data-item-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-item-clear');
        if(gameState.items){gameState.items[id]=0;}
        saveGameData();showNotification('已清空：'+id,'success');
      };
    });
    // 装饰加满/清空按钮
    document.querySelectorAll('button[data-decor-add]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-decor-add');
        if(gameState.decors){gameState.decors[id]=99;}
        saveGameData();showNotification('已获得：'+id,'success');
      };
    });
    document.querySelectorAll('button[data-decor-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-decor-clear');
        if(gameState.decors){gameState.decors[id]=0;}
        saveGameData();showNotification('已清空：'+id,'success');
      };
    });
  }
  function renderTaskAdmin() {
    // 获取全局任务、成就、活动
    const tasks = window.tasks || [];
    const achievements = window.achievements || [];
    const farmEvents = (window.gameState && gameState.farmEvents) ? gameState.farmEvents : [];
    let html = `<div class="space-y-2">
      <h3 class="font-bold text-lg mb-2">任务/活动/成就管理</h3>
      <div class="mb-2">
        <span class="font-bold">所有任务：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${tasks.map(task => `
            <button class="btn-admin" data-task-complete="${task.id}" title="完成">完成${task.name}</button>
            <button class="btn-admin" data-task-clear="${task.id}" title="清空">清空${task.name}</button>
          `).join('')}
        </div>
      </div>
      <div class="mb-2">
        <span class="font-bold">所有成就：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${achievements.map(ach => `
            <button class="btn-admin" data-ach-complete="${ach.id}" title="解锁">解锁${ach.name}</button>
            <button class="btn-admin" data-ach-clear="${ach.id}" title="清空">清空${ach.name}</button>
          `).join('')}
        </div>
      </div>
      <div class="mb-2">
        <span class="font-bold">所有活动：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${farmEvents.map(evt => `
            <button class="btn-admin" data-event-complete="${evt.id}" title="完成">完成${evt.name||evt.id}</button>
            <button class="btn-admin" data-event-clear="${evt.id}" title="清空">清空${evt.name||evt.id}</button>
          `).join('')}
        </div>
      </div>
    </div>`;
    return html;
  }
  function bindTaskAdminEvents() {
    // 任务一键完成/清空
    document.querySelectorAll('button[data-task-complete]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-task-complete');
        if(window.gameState && gameState.tasks){
          const t = gameState.tasks.find(t=>t.id===id);if(t){t.completed=true;t.progress=t.goal;}
        }
        renderTasks&&renderTasks();saveGameData&&saveGameData();showNotification('任务已完成','success');
      };
    });
    document.querySelectorAll('button[data-task-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-task-clear');
        if(window.gameState && gameState.tasks){
          gameState.tasks = gameState.tasks.filter(t=>t.id!==id);
        }
        renderTasks&&renderTasks();saveGameData&&saveGameData();showNotification('任务已清空','success');
      };
    });
    // 成就一键解锁/清空
    document.querySelectorAll('button[data-ach-complete]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-ach-complete');
        if(window.gameState && gameState.achievements){
          if(Array.isArray(gameState.achievements)){
            if(!gameState.achievements.includes(id))gameState.achievements.push(id);
          }else if(typeof gameState.achievements==='object'){
            if(gameState.achievements[id])gameState.achievements[id].completed=true;
          }
        }
        renderAchievements&&renderAchievements();saveGameData&&saveGameData();showNotification('成就已解锁','success');
      };
    });
    document.querySelectorAll('button[data-ach-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-ach-clear');
        if(window.gameState && gameState.achievements){
          if(Array.isArray(gameState.achievements)){
            gameState.achievements = gameState.achievements.filter(a=>a!==id);
          }else if(typeof gameState.achievements==='object'){
            if(gameState.achievements[id])gameState.achievements[id].completed=false;
          }
        }
        renderAchievements&&renderAchievements();saveGameData&&saveGameData();showNotification('成就已清空','success');
      };
    });
    // 活动一键完成/清空
    document.querySelectorAll('button[data-event-complete]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-event-complete');
        if(window.gameState && gameState.farmEvents){
          const e = gameState.farmEvents.find(e=>e.id===id);if(e){e.completed=true;}
        }
        saveGameData&&saveGameData();showNotification('活动已完成','success');
      };
    });
    document.querySelectorAll('button[data-event-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-event-clear');
        if(window.gameState && gameState.farmEvents){
          gameState.farmEvents = gameState.farmEvents.filter(e=>e.id!==id);
        }
        saveGameData&&saveGameData();showNotification('活动已清空','success');
      };
    });
  }
  function renderInventoryAdmin() {
    // 获取全局种子、道具、作物品质
    const seeds = (window.shopModule && shopModule.seeds) ? shopModule.seeds : [];
    const items = (window.shopModule && shopModule.items) ? shopModule.items : [];
    const fruitQualities = window.fruitQualities || [
      { level: 0, name: '普通', icon: '🟫' },
      { level: 1, name: '优良', icon: '🟤' },
      { level: 2, name: '精品', icon: '🟢' },
      { level: 3, name: '完美', icon: '✨' }
    ];
    let html = `<div class="space-y-2">
      <h3 class="font-bold text-lg mb-2">库存/背包管理</h3>
      <div class="mb-2">
        <span class="font-bold">所有种子：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${seeds.map(seed => `
            <button class="btn-admin" data-seed-add="${seed.id}" title="加满">${seed.icon||''}加${seed.name}</button>
            <button class="btn-admin" data-seed-clear="${seed.id}" title="清空">${seed.icon||''}清${seed.name}</button>
          `).join('')}
        </div>
      </div>
      <div class="mb-2">
        <span class="font-bold">所有作物（按品质）：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${seeds.map(seed => fruitQualities.map(q => `
            <button class="btn-admin" data-crop-add="${seed.id}|${q.level}" title="加满">${seed.icon||''}${q.icon||''}加${seed.name}${q.name}</button>
            <button class="btn-admin" data-crop-clear="${seed.id}|${q.level}" title="清空">${seed.icon||''}${q.icon||''}清${seed.name}${q.name}</button>
          `).join('')).join('')}
        </div>
      </div>
      <div class="mb-2">
        <span class="font-bold">所有道具：</span>
        <div class="flex flex-wrap gap-2 mt-2">
          ${items.map(item => `
            <button class="btn-admin" data-item-add="${item.id}" title="加满">${item.icon||''}加${item.name}</button>
            <button class="btn-admin" data-item-clear="${item.id}" title="清空">${item.icon||''}清${item.name}</button>
          `).join('')}
        </div>
      </div>
    </div>`;
    return html;
  }
  function bindInventoryAdminEvents() {
    // 种子加满/清空
    document.querySelectorAll('button[data-seed-add]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-seed-add');
        if(window.gameState && gameState.purchasedSeeds){gameState.purchasedSeeds[id]=99;}
        saveGameData&&saveGameData();showNotification('已加满种子：'+id,'success');
      };
    });
    document.querySelectorAll('button[data-seed-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-seed-clear');
        if(window.gameState && gameState.purchasedSeeds){gameState.purchasedSeeds[id]=0;}
        saveGameData&&saveGameData();showNotification('已清空种子：'+id,'success');
      };
    });
    // 作物加满/清空（按品质）
    document.querySelectorAll('button[data-crop-add]').forEach(btn => {
      btn.onclick = function() {
        const [id, q] = btn.getAttribute('data-crop-add').split('|');
        if(window.gameState && gameState.qualityInventory){
          if(!gameState.qualityInventory[id])gameState.qualityInventory[id]={};
          gameState.qualityInventory[id][q]=99;
        }
        saveGameData&&saveGameData();showNotification('已加满作物：'+id+' 品质'+q,'success');
      };
    });
    document.querySelectorAll('button[data-crop-clear]').forEach(btn => {
      btn.onclick = function() {
        const [id, q] = btn.getAttribute('data-crop-clear').split('|');
        if(window.gameState && gameState.qualityInventory && gameState.qualityInventory[id]){
          gameState.qualityInventory[id][q]=0;
        }
        saveGameData&&saveGameData();showNotification('已清空作物：'+id+' 品质'+q,'success');
      };
    });
    // 道具加满/清空
    document.querySelectorAll('button[data-item-add]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-item-add');
        if(window.gameState && gameState.items){gameState.items[id]=99;}
        saveGameData&&saveGameData();showNotification('已加满道具：'+id,'success');
      };
    });
    document.querySelectorAll('button[data-item-clear]').forEach(btn => {
      btn.onclick = function() {
        const id = btn.getAttribute('data-item-clear');
        if(window.gameState && gameState.items){gameState.items[id]=0;}
        saveGameData&&saveGameData();showNotification('已清空道具：'+id,'success');
      };
    });
  }
  function renderUserAdmin() {
    return `<div class="space-y-2">
      <h3 class="font-bold text-lg mb-2">用户数据导入/导出</h3>
      <button id="admin-user-export" class="btn-admin">导出当前用户数据</button>
      <input type="file" id="admin-user-import-file" style="display:none;">
      <button id="admin-user-import" class="btn-admin">导入用户数据</button>
      <textarea id="admin-user-json" class="border w-full h-32 mt-2 p-2 rounded" placeholder="用户数据JSON..." readonly></textarea>
    </div>`;
  }
  function bindUserAdminEvents() {
    document.getElementById('admin-user-export').onclick = function() {
      const data = JSON.stringify(gameState,null,2);
      document.getElementById('admin-user-json').value = data;
      const blob = new Blob([data],{type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;a.download='happyFarmUserData.json';a.click();
      URL.revokeObjectURL(url);
      showNotification('用户数据已导出','success');
    };
    document.getElementById('admin-user-import').onclick = function() {
      document.getElementById('admin-user-import-file').click();
    };
    document.getElementById('admin-user-import-file').onchange = function(e) {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        try{
          const data = JSON.parse(evt.target.result);
          Object.assign(gameState,data);
          saveGameData();updateUI();renderFarm();renderInventory();renderTasks();showNotification('用户数据已导入','success');
        }catch(err){showNotification('导入失败','error');}
      };
      reader.readAsText(file);
    };
  }

  // 管理员按钮显示/隐藏
  function updateAdminButtons() {
    const userInfo = JSON.parse(localStorage.getItem('happyFarmUserInfo')||'{}');
    const isAdmin = userInfo.account === 'dyyssb';
    document.getElementById('admin-open-btn').style.display = isAdmin ? 'block' : 'none';
    document.getElementById('admin-grow-btn').style.display = isAdmin ? 'block' : 'none';
  }
  window.updateAdminButtons = updateAdminButtons;

  // 管理员按钮事件
  document.getElementById('admin-open-btn').onclick = function() {
    showAdminPanel();
  };
  document.getElementById('admin-grow-btn').onclick = function() {
    gameState.farmData.forEach(plot => {
      if (plot.state === 'planted') {
        plot.progress = plot.growthTime * 60;
        plot.growth = 'completed';
      }
    });
    renderFarm();
    saveGameData();
    showNotification('所有作物已立即成熟！', 'success');
  };

  // 全局暴露showAdminPanel，供外部调用
  window.showAdminPanel = function() {
    let panel = document.getElementById('admin-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'admin-panel';
      panel.style.display = 'none';
      panel.style.position = 'fixed';
      panel.style.inset = '0';
      panel.style.zIndex = '1050';
      panel.style.alignItems = 'center';
      panel.style.justifyContent = 'center';
      document.body.appendChild(panel);
    }
    panel.style.display = 'flex';
    renderAdminTabs();
  };

  document.addEventListener('DOMContentLoaded', updateAdminButtons);
  window.addEventListener('storage', updateAdminButtons);

})(); 