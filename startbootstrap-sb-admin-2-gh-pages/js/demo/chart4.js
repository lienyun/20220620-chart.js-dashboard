document.addEventListener('DOMContentLoaded', function () {
    chart4()
  })


  async function chart4() {
    const requestURL = 'data.json'
    const response = await fetch(requestURL)
    const dataset = await response.json()
    // console.log('dataset', dataset)
    //住宿銷售+縣市
    const hotelSalesAmount = dataset.filter((o) => o.主行業別 === "住宿業");
    console.log("hotelSalesAmount",hotelSalesAmount)

    const hotelSalesAmountByCity = {}
    for (let i = 0; i < hotelSalesAmount.length; i++) {
        if (!hotelSalesAmountByCity[hotelSalesAmount[i]['縣市']]) {
            hotelSalesAmountByCity[hotelSalesAmount[i]['縣市']] = Number(hotelSalesAmount[i]['銷售金額排名值'])

        } else {
            hotelSalesAmountByCity[hotelSalesAmount[i]['縣市']] += Number(hotelSalesAmount[i]['銷售金額排名值'])
        }
    }
    const location = Object.keys(hotelSalesAmountByCity)
    const hotelSales = Object.values(hotelSalesAmountByCity)

    //零售銷售+縣市
    const retailSalesAmount = dataset.filter((o) => o.主行業別 === "零售業");
    console.log("hotelSalesAmount",hotelSalesAmount)

    const retailSalesAmountByCity = {}
    for (let i = 0; i < retailSalesAmount.length; i++) {
        if (!retailSalesAmountByCity[retailSalesAmount[i]['縣市']]) {
            retailSalesAmountByCity[retailSalesAmount[i]['縣市']] = Number(retailSalesAmount[i]['銷售金額排名值'])

        } else {
            retailSalesAmountByCity[retailSalesAmount[i]['縣市']] += Number(retailSalesAmount[i]['銷售金額排名值'])
        }
    }
    const retailSales = Object.values(retailSalesAmountByCity)

    // console.log("retailSalesAmount",retailSalesAmount)

    //餐飲銷售+縣市
    const foodSalesAmount = dataset.filter((o) => o.主行業別 === "餐飲業");
    // console.log("foodSalesAmount",foodSalesAmount)

    const foodSalesAmountByCity = {}
    for (let i = 0; i < foodSalesAmount.length; i++) {
        if (!foodSalesAmountByCity[foodSalesAmount[i]['縣市']]) {
            foodSalesAmountByCity[foodSalesAmount[i]['縣市']] = Number(foodSalesAmount[i]['銷售金額排名值'])

        } else {
            foodSalesAmountByCity[foodSalesAmount[i]['縣市']] += Number(foodSalesAmount[i]['銷售金額排名值'])
        }
    }
    const foodSales = Object.values(foodSalesAmountByCity)

    // console.log("foodSalesAmountByCity",foodSalesAmountByCity)

    // stackchart
let ctx4 = document.getElementById("myChart4");
const data4 = {
    labels: location,
    datasets: [{
        label: '住宿銷售金額',
        data: hotelSales,
        backgroundColor:
            [
                '#f6c23e50',
            ],
        borderColor:
            [
                '#f6c23e',
            ],
        borderWidth: 1

    }, {
        label: '零售銷售金額',
        data: retailSales,
        backgroundColor:
            [
                '#20c9a650',
            ],
        borderColor:
            [
                '#20c9a6',
            ],
        borderWidth: 1
    }, {
        label: '餐飲銷售金額',
        data: foodSales,
        backgroundColor:
            [
                '#85879650',
            ],
        borderColor:
            [
                '#858796',
            ],
        borderWidth: 1
    }]
};

const config4 = {
    type: 'bar',
    data: data4,
    options: {

        scales: {
            x: {
                stacked: true,
                grid: {
                    color: '#eee'
                },

                title: {
                    text: '縣市',
                    display: true,
                }
            },
            y: {
                stacked: true,

            }
        }
    }
};
const myChart4 = new Chart(ctx4, config4)

}