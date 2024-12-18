// script.js

// 页面加载时，显示所有存储的物品清单
window.onload = function () {
    displayItems();
};

// 计算平均日花费并保存物品
function calculateAverage() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const purchaseDate = document.getElementById('purchaseDate').value;

    // 验证输入是否合法
    if (!itemName || isNaN(itemPrice) || !purchaseDate) {
        alert("请输入完整的物品信息！");
        return;
    }

    // 计算日期差（天数）
    const purchaseDateObj = new Date(purchaseDate);
    const currentDate = new Date();
    const timeDiff = currentDate - purchaseDateObj; // 毫秒差
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 转换为天数

    if (dayDiff <= 0) {
        alert("购买日期无效！");
        return;
    }

    // 计算平均日花费
    const avgDailyCost = (itemPrice / dayDiff).toFixed(2);

    // 创建一个物品对象
    const item = {
        itemName: itemName,
        itemPrice: itemPrice,
        purchaseDate: purchaseDate,
        avgDailyCost: avgDailyCost
    };

    // 获取存储的物品清单（如果存在）
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // 将新物品添加到数组中
    items.push(item);

    // 将更新后的物品清单保存到 localStorage
    localStorage.setItem('items', JSON.stringify(items));

    // 显示物品清单
    displayItems();

    // 清空输入框
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('purchaseDate').value = '';
}

// 从 localStorage 获取物品数据并显示
// 从 localStorage 获取物品数据并显示
function displayItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const tableBody = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // 清空表格

    let totalCost = 0;

    items.forEach(item => {
        const newRow = document.createElement("tr");
        newRow.classList.add("fade-in"); // 添加渐显动画
        newRow.innerHTML = `
            <td>${item.itemName}</td>
            <td>${item.purchaseDate}</td>
            <td>${item.itemPrice}</td>
            <td>${item.avgDailyCost}</td>
            <td><button onclick="deleteRow(this)">删除</button></td>
        `;
        tableBody.appendChild(newRow);
        totalCost += item.itemPrice;
    });

    // 更新总花费
    document.getElementById('totalCost').textContent = totalCost.toFixed(2);
}


// 删除物品
function deleteRow(button) {
    const row = button.closest("tr");
    row.classList.add("fade-out"); // 添加淡出动画类
    setTimeout(() => {
        const rowIndex = Array.from(row.parentNode.children).indexOf(row);
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(rowIndex, 1); // 删除物品
        localStorage.setItem('items', JSON.stringify(items));
        displayItems(); // 更新表格显示
    }, 500); // 动画结束后移除行
}
