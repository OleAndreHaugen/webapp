modelAppData.setData({
    webapp: {
        name: "",
        description: "",
    },
    webapp_runtime: {
        name: "",
        publicAccess: false,
    },
    webapp_runtime_asset: [],
});

modelTabUpload.setData([]);

TabApps.removeSelections();

IconTabBar.setSelectedItem(IconTabProperties);
NavDetail.to(PageDetail);
