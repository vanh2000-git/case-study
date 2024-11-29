class stories {
    name;
    thumbnailURL;
    genre;
    status;
    chapters;
    constructor(name, thumbnailURL, genre = "", status = false, chapters = []) {
        this.name = name;
        this.thumbnailURL = thumbnailURL;
        this.genre = genre;
        this.status = status;
        this.chapters = chapters;
    }
    renderThumbnail() {
        return `<img src="${this.thumbnailURL}" alt="${this.name}" width="200">`;
    }
    getChapterByNumber(number) {
        return this.chapters.find(chap => chap.number === number);
    }
}