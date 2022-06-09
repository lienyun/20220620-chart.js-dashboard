document.addEventListener('DOMContentLoaded', function () {
    chart2();
})
async function chart2() {
    const requestURL = 'data.json'

    const response = await fetch(requestURL)
    const dataset = await response.json()
    console.log('dataset', dataset)

    const invoiceAmountByIndustry = {}
    for (let i = 0; i < dataset.length; i++) {
        if (!invoiceAmountByIndustry[dataset[i]['主行業別']]) {
            invoiceAmountByIndustry[dataset[i]['主行業別']] = Number(dataset[i]['發票張數排名值'])

        } else {
            invoiceAmountByIndustry[dataset[i]['主行業別']] += Number(dataset[i]['發票張數排名值'])
        }
    }
    const salesAmountByIndustry = {}
    for (let i = 0; i < dataset.length; i++) {
        if (!salesAmountByIndustry[dataset[i]['主行業別']]) {
            salesAmountByIndustry[dataset[i]['主行業別']] = Number(dataset[i]['銷售金額排名值'])

        } else {
            salesAmountByIndustry[dataset[i]['主行業別']] += Number(dataset[i]['銷售金額排名值'])
        }
    }
    console.log('invoiceAmountByIndustry', invoiceAmountByIndustry)
    console.log('salesAmountByIndustry', salesAmountByIndustry)

    const industry = Object.keys(invoiceAmountByIndustry)
    const invoiceAmount = Object.values(invoiceAmountByIndustry)

    const salesAmount = Object.values(salesAmountByIndustry)


    // linechart
    let ctx2 = document.getElementById("myChart2");
    const data2 = {
        labels: industry,
        datasets: [{
            label: '電子發票張數排名值',
            data: invoiceAmount,

            backgroundColor:
                [
                    '#1cc88a50',
                ],
            // borderColor: none,

        }, {
            label: '銷售金額',
            data: salesAmount,

            backgroundColor:
                [
                    '#36b9cc50',
                ],
            // borderColor: '#FFB00050',
        }]
    };

    const config2 = {
        type: 'line',
        data: data2,
        options: {

            plugins: {

            },
            scales: {
                x: {
                    grid: {
                        color: '#eee'
                    },

                    title: {
                        text: '行業別',
                        display: true,
                    }
                }
            }
        }
    };

    const myChart2 = new Chart(ctx2, config2)
}