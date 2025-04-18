
export function FusionChartsConstructor(fusionchartsService: any, chartConfig: Object) {
    const FusionCharts = fusionchartsService.getFusionChartsStatic();


    getLicense().then((license: any) => {
        FusionCharts['options'].license(license);
    }
    ).catch((error: any) => {
        console.error("Error fetching license:", error);
        // Handle the error as needed
    });

    return new FusionCharts(chartConfig);
}

async function getLicense() {
    const response = await fetch("r/fusioncharts.json");
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

