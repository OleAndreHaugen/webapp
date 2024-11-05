const manager = p9.manager ? p9.manager : modules.typeorm.getConnection().manager;

const id = req.query.id;

await manager.delete("webapp", {
    id: id,
});

await manager.delete("webapp_runtime", {
    id: id,
});

await manager.delete("webapp_runtime_asset", {
    runtimeId: id,
});

complete();
