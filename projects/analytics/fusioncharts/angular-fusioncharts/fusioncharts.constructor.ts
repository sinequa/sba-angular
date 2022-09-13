
export function FusionChartsConstructor(fusionchartsService: any, chartConfig: Object) {
    const FusionCharts = fusionchartsService.getFusionChartsStatic();

    return new FusionCharts(chartConfig);
}

