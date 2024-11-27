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
    addChapters(number, title, content) {
        const chapter = {
            number: number,
            tittle: title,
            content: content
        }
        this.chapters.push(chapter);
    }
    getChapterByNumber(number) {
        return this.chapters.find(chap => chap.number === number);
    }
    // listChapters() {
    //     return this.chapters.map(chap => 'Chapter ${chap.number}: ${chap.title}).join("\n")');
    // }
    // displayStory() {
    //     return `${this.name} ${this.renderThumbnail()} ${this.genre} ${this.status}`;
    // }
}