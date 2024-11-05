const manager = p9.manager ? p9.manager : modules.typeorm.getConnection().manager;
const id = req.query.id;

const webapp = await manager.findOne("webapp", {
    where: { id: id },
    select: ["id", "name", "description", "updatedAt", "changedBy"],
});

const webapp_runtime = await manager.findOne("webapp_runtime", {
    where: { id: id },
    select: ["id", "publicAccess"],
});

const webapp_runtime_asset = await manager.find("webapp_runtime_asset", {
    where: { runtimeId: id },
    select: ["path"],
    order: {
        path: "ASC",
    },
});

result.data = {
    webapp,
    webapp_runtime,
    webapp_runtime_asset,
};

complete();
