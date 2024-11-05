function generateArtifactVersion() {
    const date = new Date();

    return (
        date.getFullYear().toString().substr(-2) +
        "." +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "." +
        date.getDate().toString().padStart(2, "0") +
        "." +
        date.getHours().toString().padStart(2, "0") +
        date.getMinutes().toString().padStart(2, "0")
    );
}

complete({
    generateArtifactVersion,
});
