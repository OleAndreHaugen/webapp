sap.m.MessageBox.confirm("Delete webapp? This cannot be undone!", {
    icon: sap.m.MessageBox.Icon.ERROR,
    title: "Danger Zone",
    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
    initialFocus: "No",
    onClose: async function (sAction) {
        if (sAction === "YES") {
            const options = {
                parameters: {
                    id: modelAppData.oData.webapp.id,
                },
            };

            BusyDialog.setText("Deleting webapp and assets");
            BusyDialog.open();

            apiDelete(options).then(function (res) {
                TabApps.removeSelections();
                NavDetail.to(PageEmpty);

                toolAppsUpdate.firePress();
                BusyDialog.close();
            });
        }
    },
});
