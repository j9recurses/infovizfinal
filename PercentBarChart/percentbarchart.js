$(function () {
        $('#container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['Rape', 'Kidnapping and Abduction of Women & Girls', 'Dowry Deaths', 'Assault on women with intent to outrage her modesty', 'Insult to the modesty of Women', 'Cruelty by Husband or his relatives', 'Importation of Girls from Foreign Country', 'Immoral Traffic (P) Act', 'Dowry Prohibition Act', 'Indecent Representation of Women (P) Act', 'Commission of Sati (P) Act']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
                series: [{
                name: 'Total Male',
                data: [30168, 46772, 19387, 54931, 10931, 149811, 39, 4964, 12386, 159, 0]
            }, {
                name: 'Total Female',
                data: [949, 2311, 5031, 1896, 178, 47951, 7, 3088, 3400, 16, 0]
            }]
        });
    });