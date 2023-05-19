"use strict";

// ======================================================================
// Course
// ======================================================================

class Course {
    constructor(id, name, videoId, duration, price) {
        this.id = id;
        this.name = name;
        this.videoId = videoId;
        this.duration = duration;
        this.price = price;
    }

    static fromJson(jsonObj) {
        return new Course(
            jsonObj["id"],
            jsonObj["name"],
            jsonObj["video-id"],
            jsonObj["duration"],
            jsonObj["price"],
        );
    }

    get videoUrl() {
        return `https://youtu.be/${this.videoId}`;
    }

    get videoThumbnailUrl() {
        return `https://img.youtube.com/vi/${this.videoId}/0.jpg`;
    }

    toHtmlDomCard() {
        const clockSvg = `
        <svg class="bi bi-clock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
        </svg>
        `.trim();

        const coinSvg = `
        <svg class="bi bi-coin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        </svg>
        `.trim();

        // <div id="course-${id}" class="col">
        //     <div class="card shadow-sm">
        //         <a href="${videoUrl} <img class="card-img-top" src="${videoThumbnailUrl}" alt="${name}" style=""></a>
        //         <div class="card-body">
        //             <h5 class="card-title pb-2 border-bottom">${name}</h5>
        //             <div class="d-flex justify-content-between align-items-center">
        //                 <div>
        //                     <svg class="bi bi-clock pe-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        //                         <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
        //                         <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
        //                     </svg>
        //                     <small class="text-body-secondary ps-2">${duration}</small>
        //                 </div>
        //                 <div>
        //                     <svg class="bi bi-coin pe-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        //                         <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
        //                         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        //                         <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        //                     </svg>
        //                     <small class="text-body-secondary ps-2">${price}</small>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        return $("<div></div>", { id: `course-${this.id}`, class: "col" }).append(
            $("<div></div>", { class: "card shadow-sm" }).append(
                $("<a></a>", { href: this.videoUrl }).append(
                    $("<img>", { class: "card-img-top", src: this.videoThumbnailUrl, alt: this.name }),
                ),
                $("<div></div>", { class: "card-body" }).append(
                    $("<h5></h5>", { class: "card-title pb-2 border-bottom" }).html(this.name),
                    $("<div></div>", { class: "d-flex justify-content-between align-items-center" }).append(
                        $("<div></div>").append(
                            clockSvg,
                            $("<small></small>", { class: "text-body-secondary ps-2" }).html(this.duration),
                        ),
                        $("<div></div>").append(
                            coinSvg,
                            $("<small></small>", { class: "text-body-secondary ps-2" }).html(this.price > 0 ? `${this.price} đồng` : `Miễn phí`),
                        ),
                    ),
                ),
            ),
        );
    }
}

async function fetchAllCourses(baseUrl) {
    try {
        const jsonData = await $.getJSON(new URL("courses", baseUrl));
        return jsonData.map(e => Course.fromJson(e));
    }
    catch (err) {
        return [];
    }
}

// ======================================================================
// Teacher
// ======================================================================

class Teacher {
    constructor(id, name, jobTitle, avatarUrl) {
        this.id = id;
        this.name = name;
        this.jobTitle = jobTitle;
        this.avatarUrl = avatarUrl;
    }

    static fromJson(jsonObj) {
        return new Teacher(
            jsonObj["id"],
            jsonObj["name"],
            jsonObj["job-title"],
            jsonObj["avatar"],
        );
    }

    toHtmlDomCard() {
        // <div id="teacher-${id}" class="p-4 text-center">
        //     <img class="rounded-circle border" src="${avatarUrl}" alt="${name}">
        //     <h5 class="pt-3">${name}</h5>
        //     <p class="text-muted">${jobTitle}</p>
        // </div>
        return $("<div></div>", { id: `teacher-${this.id}`, class: "col" }).append(
            $("<div></div>", { class: "p-4 text-center" }).append(
                $("<img>", { class: "rounded-circle border", src: this.avatarUrl, alt: this.name }),
                $("<h5></h5>", { class: "pt-3" }).html(this.name),
                $("<p></p>", { class: "text-muted" }).html(this.jobTitle),
            ),
        );
    }
}

async function fetchAllTeachers(baseUrl) {
    try {
        const jsonData = await $.getJSON(new URL("teachers", baseUrl));
        return jsonData.map(e => Teacher.fromJson(e));
    }
    catch (err) {
        return [];
    }
}

// ======================================================================
// Khởi tạo mặc định
// ======================================================================

async function fetchAllCoursesAndTeachers(baseUrl) {
    return await Promise.all([ fetchAllCourses(baseUrl), fetchAllTeachers(baseUrl) ]);
}

function displayCoursesAlbum(coursesList) {
    const coursesAlbum = $("#courses-album");
    coursesList.forEach(course => {
        coursesAlbum.append(course.toHtmlDomCard());
    });
}

function displayTeachersAlbum(teachersList) {
    const teachersAlbum = $("#teachers-album");
    teachersList.forEach(teacher => {
        teachersAlbum.append(teacher.toHtmlDomCard());
    });
}

let coursesList = undefined;
let teachersList = undefined;

$(async () => {
    // Khởi tạo toàn bộ khoá học và giảng viên
    [coursesList, teachersList] = await fetchAllCoursesAndTeachers("https://64662fa7228bd07b355e4d69.mockapi.io");

    displayCoursesAlbum(coursesList);
    displayTeachersAlbum(teachersList);
});
