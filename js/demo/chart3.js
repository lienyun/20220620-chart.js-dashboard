document.addEventListener('DOMContentLoaded', function () {
    chart3()
  })

  async function chart3() {
    const requestURL = 'data.json'

    const response = await fetch(requestURL)
    const dataset = await response.json()
    console.log('dataset', dataset)

    const salesAmountByIndustry = {}
    for (let i = 0; i < dataset.length; i++) {
        if (!salesAmountByIndustry[dataset[i]['主行業別']]) 
        //如果已經有這個行業別屬性
        {
            salesAmountByIndustry[dataset[i]['主行業別']] = Number(dataset[i]['銷售金額排名值'])
            //就把後面的value加到屬性後

        } else {
            salesAmountByIndustry[dataset[i]['主行業別']] += Number(dataset[i]['銷售金額排名值'])
            //不然沒有這個行業別的話，就新增一個
        }
    }
    const industry = Object.keys(salesAmountByIndustry)
    const salesAmount = Object.values(salesAmountByIndustry)

    // piechart
    let ctx3 = document.getElementById("myChart3");
    const data3 = {
        labels: industry,
        datasets: [{
            label: '餐飲業銷售金額',
            data: salesAmount,

            backgroundColor: [
                '#4e73df',
                '#fd7e14',
                '#1cc88a'
            ]

        }]
    };

    const config3 = {
        type: 'pie',
        data: data3,
        options: {

            aspectRatio: 2,

        }
    };

    const myChart3 = new Chart(ctx3, config3)

}