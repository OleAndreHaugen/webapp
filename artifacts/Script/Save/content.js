const manager = p9.manager ? p9.manager : modules.typeorm.getConnection().manager;

if (req.body.id) {
    // Save
    let webapp = await manager.findOne("webapp", {
        where: { id: req.body.id },
        select: ["id", "name", "description", "updatedAt", "changedBy"],
    });

    webapp.name = req.body.name;
    webapp.description = req.body.description || "";
    webapp.updatedAt = new Date();
    webapp.changedBy = req.user.username;

    await manager.save("webapp", webapp);

    const webapp_runtime = await manager.findOne("webapp_runtime", {
        where: { id: req.body.id },
        select: ["id", "publicAccess"],
    });

    webapp_runtime.name = req.body.name;
    webapp_runtime.publicAccess = req.body.publicAccess || false;
    webapp_runtime.ver = globals.Utils.generateArtifactVersion();
    webapp_runtime.updatedAt = new Date();

    await manager.save("webapp_runtime", webapp_runtime);

    result.data = {
        webapp,
        webapp_runtime,
    };
} else {
    // Create
    const runtimeId = uuid();

    let webapp = {
        id: runtimeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: req.user.username,
        changedBy: req.user.username,
        settings: null,
        name: req.body.name,
        type: "react",
        description: req.body.description,
        onlyRuntime: true,
    };

    await manager.save("webapp", webapp);

    let webapp_runtime = {
        id: runtimeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        page: getNewTemplate(req.body.name),
        name: req.body.name,
        ver: globals.Utils.generateArtifactVersion(),
        publicAccess: req.body.publicAccess,
    };

    await manager.save("webapp_runtime", webapp_runtime);

    result.data = {
        webapp,
        webapp_runtime,
    };
}

complete();

function getNewTemplate(title) {
    return `<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>${title}</title></head><body><h2>WebApp have no assets uploaded.</h2></body></html>`;
}
