const manager = p9.manager ? p9.manager : modules.typeorm.getConnection().manager;

const id = req.query.id;

await manager.save("webapp_runtime_asset", {
    runtimeId: id,
    path: req.body.path,
    source: req.body.source,
    createdAt: new Date(),
    updatedAt: new Date(),
});

// When file isStartFile
if (req.body.isStartFile) {
    const webapp_runtime = await manager.findOne("webapp_runtime", {
        where: { id: id },
    });
          
    webapp_runtime.ver = globals.Utils.generateArtifactVersion();
    webapp_runtime.updatedAt = new Date();
    webapp_runtime.page = req.body.source;

    await manager.save("webapp_runtime", webapp_runtime);

}

complete();
