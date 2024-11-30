class Stories {
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

    static getStoryByName(name) {
        return storiesList.find(story => story.name === name);
    }

    renderChapterList(containerId) {
        const chapterListElement = document.getElementById(containerId);
        if (!chapterListElement) {
            console.warn(`Không tìm thấy phần tử với ID: ${containerId}`);
            return;
        }
        if (!story.chapters || story.chapters.length === 0) {
            chapterListElement.innerHTML = "<p>Không có chương nào để hiển thị.</p>";
            return;
        }

        // Tạo thẻ ul
        const ulElement = document.createElement("ul");

        story.chapters.forEach(chap => {
            const listItem = document.createElement("li");

            // Tạo thẻ a
            const link = document.createElement("a");
            link.href = `read-chapter.html?story=${encodeURIComponent(story.name)}&chapter=${chap.number}`;
            link.textContent = `Chapter ${chap.number}: ${chap.title}`;

            // Thêm thẻ a vào li
            listItem.appendChild(link);

            // Thêm li vào ul
            ulElement.appendChild(listItem);
        });

        // Xóa nội dung cũ và thêm ul vào div#chapter-list
        chapterListElement.innerHTML = "";
        chapterListElement.appendChild(ulElement);

    }
}