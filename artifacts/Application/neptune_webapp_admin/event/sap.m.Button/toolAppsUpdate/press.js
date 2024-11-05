apiList().then(function (res) {
    modelTabApps.setData(res);

    if (!TabUpload.getSelectedItem()) {
        const items = TabApps.getItems();

        items.forEach(function (item) {
            const context = item.getBindingContext();
            const data = context.getObject();

            if (data.id === modelAppData.oData.webapp.id) {
                TabApps.setSelectedItem(item);
            }
        });
    }
});
