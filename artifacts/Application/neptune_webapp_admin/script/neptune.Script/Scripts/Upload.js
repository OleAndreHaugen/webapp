function uploadFolder(event) {
    let files = [];
    modelTabUpload.setData(files);

    $.each(event.target.files, function (i, file) {
        try {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                let path = file.webkitRelativePath.substring(
                    file.webkitRelativePath.indexOf("/") + 1
                );

                ModelData.Add(TabUpload, {
                    path: "/" + path,
                    size: file.size,
                    source: Base64.decode(event.target.result.split(",")[1]),
                });

                document.getElementById("folderUploader").value = "";
            };
            fileReader.readAsDataURL(file);
        } catch (e) {}
    });
}

async function uploadFiles() {
    // Check for Selected StartFile
    const selectedItem = TabUpload.getSelectedItem();

    if (selectedItem) {
        const context = selectedItem.getBindingContext();
        const data = context.getObject();
    } else {
        sap.m.MessageToast.show("Please select the start file for your WebApp");
        return;
    }

    let options = {
        parameters: {
            id: modelAppData.oData.webapp.id,
        },
    };

    BusyDialog.setText("Deleting existing assets");
    BusyDialog.open();

    await apiDeleteAssets(options);

    let totFiles = modelTabUpload.oData.length;
    let currentIndex = 0;

    BusyDialog.setText("Uploading files " + currentIndex + "/" + totFiles);

    modelTabUpload.oData.forEach(function (data) {
        let optionAsset = {
            parameters: {
                id: modelAppData.oData.webapp.id,
            },
            data: data,
        };

        apiUploadAsset(optionAsset).then(function (res) {
            currentIndex++;
            BusyDialog.setText("Uploading files " + currentIndex + "/" + totFiles);

            if (currentIndex === totFiles) {
                BusyDialog.close();
                modelTabUpload.setData([]);
            }
        });
    });
}

// window.uploadIndex = uploadIndex;
window.uploadFolder = uploadFolder;
