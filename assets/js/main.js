// File and Folder Structures....................................

const folder_space = document.getElementById("folders");
const file_space = document.getElementById("files");
const common_card = document.getElementsByClassName("common_card");
const folder_file_counter = document.getElementsByClassName("folder_file_counter");
const create_folder_button = document.getElementById("btn_add");
const create_folder_input = document.getElementById("folder-name");
const create_file_button = document.getElementById("btn_file");
const create_file_input = document.getElementById("file-name");
const breadcrumb = document.getElementById("myBreadcrumb");
const folder_counter = document.getElementById("folder_counter");
const file_counter = document.getElementById("file_counter");
const folder_counter2 = document.getElementById("folder_counter2");
const file_counter2 = document.getElementById("file_counter2");
const delete_folder_button = document.getElementById("btn_delete_folder");
const loader = document.getElementById("main_loader");


//Function to calculate size of Object............................................................................
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Main folder Structures.....................................................................................
var Training = {
    folder: {
        Day1: {
            folder: {
                P1: {
                    folder: {
                        P11: {
                            folder: {},
                            file: []
                        },
                        P22: {
                            folder: {},
                            file: []
                        },
                    },
                    file: ["11.doc"]
                },
                P2: {
                    folder: {
                        P11: {
                            folder: {},
                            file: []
                        },
                        P22: {
                            folder: {},
                            file: []
                        },
                    },
                    file: ["22.pdf"]
                },
            },
            file: ["1.doc", "2.pdf", "3.ppt"],
        },
        Day2: {
            folder: {
                P1: {
                    folder: {},
                    file: []
                },
                P2: {
                    folder: {},
                    file: []
                },
            },
            file: ["1.doc", "2.pdf", "3.ppt"],
        }
    },
    file: ['Maharshi.pdf', 'Jay.doc', 'Priyank.ppt']
};

//File image properties...........................................................................................................................
const file_img = {
    doc: {
        bgColor: "#F5F5FF",
        img_src: "./assets/icons/File-text.svg",
    },
    pdf: {
        bgColor: "#FFF5F7",
        img_src: "./assets/icons/File-pdf.svg",
    },
    ppt: {
        bgColor: "#FFF9EB",
        img_src: "./assets/icons/File-ppt.svg",
    },
}

var my_folder_data = [null, Training];
var my_file_data = [null, Training];

var header = ["My documents", "Training"];

var folder_data = Training;
var file_data = Training;





// Rendering .................................................................................................................................................
function renderFolders() {
    var folders = "";
    var l = 0;
    var cnt = 0;
    for (var i in folder_data.folder) {
        if (i != "") {
            var s1 = `
            <div class="common_card folder_card">
                <button style="border:none;background:transparent;padding:0; margin:0;" onclick="forwardFolder('${i}')">
                    <div class="card_img">
                        <img src="./assets/icons/Folder.svg" alt="">
                    </div>
                </button>
                <div class="card_text row">
                    <div class="col-md-10">
                        <p style="width:150px;overflow:hidden;text-overflow: ellipsis;">${i}</p>
                    </div>
                    <div class="col-md-2">
                        <button onclick="addDotMenu('${i}')" class="btn_threedots"><img src="./assets/icons/DotsVerticalO.svg" alt=""></button>
                        <ul class="list-group list_grp" id="${i}">
                            <li class="list-group-item"><button onclick="renameFolder('${i}')" data-bs-toggle="modal" data-bs-target="#renameFolderModal" style="border:none;background:transparent;"><img src="./assets/images/rename.svg"> Rename folder</button></li>
                            <li class="list-group-item"><button onclick="duplicateFolder('${i}')" style="border:none;background:transparent;border-radius:50%;"><img src="./assets/images/duplicate.svg"> Duplicate folder</button></li>
                            <li class="list-group-item"><button onclick="deleteFolder('${i}')" data-bs-toggle="modal" data-bs-target="#deleteFolderModal" style="border:none;background:transparent;color:#D33852;"><img src="./assets/images/delete.svg"> Delete folder</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
            folders = s1 + folders;
            l++;
        }
    }
    folder_space.innerHTML = folders;
    folder_counter.textContent = l;
    folder_counter2.textContent = l;
    console.log(Training);
}

// File structure............................................................................................................................................................
function renderFiles() {
    var files = "";
    var cnt = 0;
    for (var i of file_data.file) {
        const extension = i.split(".").pop();
        if (extension == "ppt" || extension == "pdf" || extension == "doc") {
            const file = `
            <div class="common_card file_card">
                <div class="file_card_img" style="background-color:${file_img[extension].bgColor}">
                    <img src="${file_img[extension].img_src}" alt="">
                </div>
                <div class="card_text row">
                    <div class="col-md-10">
                        <h3 style="color:#717171;font-size:14px;">${extension.toUpperCase()}</h3>
                        <p style="width:150px;overflow:hidden;text-overflow: ellipsis;">${i.split(".")[0]}</p>
                    </div>
                    <div class="col-md-2" style="position:relative;">
                        <button onclick="addDotMenu('${i}')" class="btn_threedots"><img src="./assets/icons/DotsVerticalO.svg" alt=""></button>
                        <ul class="list-group list_grp" id="${i}">
                            <li class="list-group-item"><button onclick="renameFile('${i}')" data-bs-toggle="modal" data-bs-target="#renameFileModal" style="border:none;background:transparent;border-radius:50%;"><img src="./assets/images/rename.svg"> Rename file</button></li>
                            <li class="list-group-item"><button onclick="duplicateFile('${i}')" style="border:none;background:transparent;border-radius:50%;"><img src="./assets/images/duplicate.svg"> Duplicate file</button></li>
                            <li class="list-group-item"><button onclick="deleteFile('${i}')" data-bs-toggle="modal" data-bs-target="#deleteFileModal" style="border:none;background:transparent;border-radius:50%;color:#D33852;"><img src="./assets/images/delete.svg"> Delete file</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
            files = files + file;
            cnt++;
        }
    }
    file_counter.textContent = cnt;
    file_counter2.textContent = cnt;
    file_space.innerHTML = files;
    console.log(Training);
}






//Route Breadcrumb...............................................................................................................................
function addBreadcrumb(name) {
    const idx = header.indexOf(name);
    header = header.slice(0, idx + 1);
    my_folder_data = my_folder_data.slice(0, idx + 1);
    my_file_data = my_file_data.slice(0, idx + 1);

    folder_data = my_folder_data[idx];
    file_data = my_file_data[idx];
    backwardFolder();
}

//Forward Folder.................................................................................................................................
function forwardFolder(name) {
    file_data = file_data.folder[name];
    folder_data = folder_data.folder[name];
    console.log(folder_data.file);
    header.push(name);
    my_folder_data.push(folder_data);
    my_file_data.push(file_data);

    var x = "";
    var y = 0;
    for (var i of header) {
        y++;
        if (y == header.length) {
            x = x + `
                <li class="breadcrumb-item" aria-current="page"><button  onclick="addBreadcrumb('${i}')" style="border:none;background:transparent;outline:none">${i}</button></li>
            `;
        } else if (i == "My documents") {
            x = x + `
                <li style="color:#686868;" class="breadcrumb-item" aria-current="page">${i}</li>
            `;
        } else {
            x = x + `
                <li class="breadcrumb-item" aria-current="page"><button onclick="addBreadcrumb('${i}')" style="border:none;background:transparent;color:#686868;">${i}</button></li>
            `;
        }
    }
    breadcrumb.innerHTML = x;

    for (var i = 0; i < common_card.length; i++) {
        common_card[i].style.visibility = "hidden";
    }

    folder_space.classList.add("skeleton");
    file_space.classList.add("skeleton");

    // for (var i = 0; i < folder_file_counter.length; i++) {
    //     folder_file_counter[i].textContent
    //     folder_file_counter[i].classList.add("skeleton2");
    // }

    setTimeout(() => {
        folder_space.classList.remove("skeleton");
        file_space.classList.remove("skeleton");
        // for (var i = 0; i < folder_file_counter.length; i++) {
        //     folder_file_counter[i].classList.remove("skeleton2");
        // }
        for (var i = 0; i < common_card.length; i++) {
            common_card[i].style.visibility = "visible";
        }
        renderFolders();
        renderFiles();
    }, 3000);

}


//Route Breadcrumb..................................................................................................................
function addBreadcrumb(name) {
    const idx = header.indexOf(name);
    header = header.slice(0, idx + 1);
    my_folder_data = my_folder_data.slice(0, idx + 1);
    my_file_data = my_file_data.slice(0, idx + 1);

    folder_data = my_folder_data[idx];
    file_data = my_file_data[idx];
    backwardFolder();
}

function backwardFolder() {
    var x = "";
    var y = 0;
    for (var i of header) {
        y++;
        if (y == header.length) {
            x = x + `
                <li class="breadcrumb-item" aria-current="page"><button onclick="addBreadcrumb('${i}')" style="border:none;background:transparent;">${i}</button></li>
            `;
        } else if (i == "My documents") {
            x = x + `
                <li style="color:#686868;" class="breadcrumb-item" aria-current="page">${i}</li>
            `;
        } else {
            x = x + `
                <li class="breadcrumb-item" aria-current="page"><button onclick="addBreadcrumb('${i}')" style="border:none;background:transparent;color:#686868;">${i}</button></li>
            `;
        }
    }
    breadcrumb.innerHTML = x;

    for (var i = 0; i < common_card.length; i++) {
        common_card[i].style.visibility = "hidden";
    }

    folder_space.classList.add("skeleton");
    file_space.classList.add("skeleton");

    // for (var i = 0; i < folder_file_counter.length; i++) {
    //     folder_file_counter[i].classList.add("skeleton2");
    // }

    setTimeout(() => {
        folder_space.classList.remove("skeleton");
        file_space.classList.remove("skeleton");

        // for (var i = 0; i < folder_file_counter.length; i++) {
        //     folder_file_counter[i].classList.remove("skeleton2");
        // }
        for (var i = 0; i < common_card.length; i++) {
            common_card[i].style.visibility = "visible";
        }

        renderFolders();
        renderFiles();
    }, 2500);
}

function backwardByBackButton() {
    console.log(header);
    if (header[header.length - 1] != "Training") {
        header.pop();
        my_file_data.pop();
        my_folder_data.pop();
        var l = header.length - 1;
        file_data = my_file_data[l];
        folder_data = my_folder_data[l];
    }
    backwardFolder();
}



//DELETE folder..........................................................................................................................

function deleteFolder(name) {
    addDotMenu(name);
    document.getElementById("exampleModalLabel1").innerText = `Delete ${name} folder?`;
    document.getElementById("btn_delete_folder").setAttribute("onclick", `deleteFolder1('${name}')`);
}

function deleteFolder1(name) {
    console.log(name);
    delete folder_data.folder[name];

    setTimeout(() => {
        loader.style.visibility = "hidden";
        renderFolders();
        renderFiles();
    }, 2500);
    loader.style.visibility = "visible";
}

//DELETE file..................................................................................................................................
function deleteFile(name) {
    addDotMenu(name);
    document.getElementById("exampleModalLabel2").innerText = `Delete ${name} file?`;
    document.getElementById("btn_delete_file").setAttribute("onclick", `deleteFile1('${name}')`);
}

function deleteFile1(name) {
    var idx = file_data.file.indexOf(name);
    file_data.file.splice(idx, 1);

    setTimeout(() => {
        loader.style.visibility = "hidden";
        renderFolders();
        renderFiles();
    }, 2500);
    loader.style.visibility = "visible";
}






//Rename Folder/...............................................................................................................................................
function renameFolder(name) {
    addDotMenu(name);
    document.getElementById("rename_folder_input").value = `${name}`;
    document.getElementById("btn_rename_folder").setAttribute("onclick", `renameFolder1('${name}')`)
}

function renameFolder1(name) {
    const input_folder = document.getElementById("rename_folder_input").value;
    folder_data.folder[input_folder] = folder_data.folder[name];
    delete folder_data.folder[name];

    setTimeout(() => {
        loader.style.visibility = "hidden";
        renderFolders();
        renderFiles();
    }, 2500);
    loader.style.visibility = "visible";
}

// Rename File..................................................................................................................................................
function renameFile(name) {
    addDotMenu(name);
    document.getElementById("rename_file_input").value = `${name}`;
    document.getElementById("btn_rename_file").setAttribute("onclick", `renameFile1('${name}')`);
}

function renameFile1(name) {
    const input_file = document.getElementById("rename_file_input").value;
    var idx = file_data.file.indexOf(name);
    file_data.file[idx] = input_file;

    setTimeout(() => {
        loader.style.visibility = "hidden";
        renderFolders();
        renderFiles();
    }, 2500);
    loader.style.visibility = "visible";
}





//Duplicate Folder................................................................................................................................................
function duplicateFolder(name) {
    addDotMenu(name);
    var s1 = name;
    if (folder_data.folder.hasOwnProperty(name)) {
        var x = 1;
        s1 = "" + `${name}` + "(" + `${x}` + ")";
        while (folder_data.folder.hasOwnProperty(s1)) {
            var s1 = "" + `${name}` + "(" + `${++x}` + ")";
        }
    }
    folder_data.folder[s1] = folder_data.folder[name];

    setTimeout(() => {
        loader.style.visibility = "hidden";
        renderFolders();
    }, 2500);
    loader.style.visibility = "visible";
}

function duplicateFile(name) {
    var idx = file_data.file.indexOf(name);
    file_data.file.splice(idx + 1, 0, name);
    file_data.file.join();

    setTimeout(() => {
        loader.style.visibility = "hidden";
        renderFiles();
    }, 2500);
    loader.style.visibility = "visible";
}






//Dot menu with rename, duplicate and delete......................................................................................................................
function addDotMenu(name) {
    var x = document.getElementById(name);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
$(document).mouseup(function(e) {
    var container = $(".list_grp");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});







//Create folder event listner....................................................................................................................................
create_folder_button.addEventListener('click', () => {
    var val_folder = create_folder_input.value;
    if (val_folder != "") {

        if (folder_data.folder.hasOwnProperty(val_folder)) {
            var x = 1;
            var s1 = "" + `${val_folder}` + "(" + `${x}` + ")";
            while (folder_data.folder.hasOwnProperty(s1)) {
                var s1 = "" + `${val_folder}` + "(" + `${++x}` + ")";
            }
            val_folder = s1;
        }
        folder_data.folder[val_folder] = {
            folder: {},
            file: []
        }
        document.getElementById("folderModal").style.display = "none";
        document.body.classList = [];
        document.body.style = "";
        document.querySelector(".modal-backdrop").remove();

        setTimeout(() => {
            loader.style.visibility = "hidden";
            renderFolders();
        }, 2500);
        loader.style.visibility = "visible";
    } else {
        alert("Enter Full name of Your Folder");
    }
    create_folder_input.value = "";
});

//Create File event Listner................................................................................................................................
create_file_button.addEventListener("click", () => {
    const val_file = create_file_input.value;
    if (val_file != "") {
        file_data.file = [val_file, ...file_data.file];

        document.body.classList = [];
        document.body.style = "";
        document.getElementById("fileModal").style.display = "none";
        document.querySelector(".modal-backdrop").remove();

        setTimeout(() => {
            loader.style.visibility = "hidden";
            renderFiles();
        }, 2500);
        loader.style.visibility = "visible";
    } else {
        alert("Enter full name for your file");
    }
    create_file_input.value = "";
});





//Search.....................................................................................................................................................

function search() {
    const search_input = document.getElementById("search_input").value;
    findFolders(search_input);
    findFiles(search_input);
}

function findFolders(name) {
    var folders = "";
    var l = 0;
    for (var i in folder_data.folder) {
        if (i.startsWith(name)) {
            var s1 = `
                <div class="common_card folder_card">
                    <button style="border:none;background:transparent;" onclick="forwardFolder('${i}')">
                        <div class="card_img">
                            <img src="./assets/icons/Folder.svg" alt="">
                        </div>
                    </button>
                    <div class="card_text row">
                        <div class="col-md-10">
                            <p style="width:150px;overflow:hidden;text-overflow: ellipsis;">${i}</p>
                        </div>
                        <div class="col-md-2">
                            <button onclick="addDotMenu('${i}')" class="btn_threedots"><img src="./assets/icons/DotsVerticalO.svg" alt=""></button>
                            <ul class="list-group list_grp" id="${i}">
                                <li class="list-group-item"><button onclick="renameFolder('${i}')" data-bs-toggle="modal" data-bs-target="#renameFolderModal" style="border:none;background:transparent;"><img src="./assets/images/rename.svg"> Rename folder</button></li>
                                <li class="list-group-item"><button onclick="duplicateFolder('${i}')" style="border:none;background:transparent;border-radius:50%;"><img src="./assets/images/duplicate.svg"> Duplicate folder</button></li>
                                <li class="list-group-item"><button onclick="deleteFolder('${i}')" data-bs-toggle="modal" data-bs-target="#deleteFolderModal" style="border:none;background:transparent;color:#D33852;"><img src="./assets/images/delete.svg"> Delete folder</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            folders = s1 + folders;
            l++;
        }
    }
    folder_space.innerHTML = folders;
    folder_counter.textContent = l;
    folder_counter2.textContent = l;
}

function findFiles(name) {
    var files = "";
    var l = 0;
    for (var i of file_data.file) {
        const extension = i.split(".").pop();
        if (i.startsWith(name)) {
            const file = `
                <div class="common_card file_card">
                    <div class="file_card_img" style="background-color:${file_img[extension].bgColor}">
                        <img src="${file_img[extension].img_src}" alt="">
                    </div>
                    <div class="card_text row">
                        <div class="col-md-10">
                            <h3 style="color:#717171;font-size:14px;">${extension.toUpperCase()}</h3>
                            <p style="width:150px;overflow:hidden;text-overflow: ellipsis;">${i.split(".")[0]}</p>
                        </div>
                        <div class="col-md-2" style="position:relative;">
                            <button onclick="addDotMenu('${i}')" class="btn_threedots"><img src="./assets/icons/DotsVerticalO.svg" alt=""></button>
                            <ul class="list-group list_grp" id="${i}">
                                <li class="list-group-item"><button onclick="renameFile('${i}')" data-bs-toggle="modal" data-bs-target="#renameFileModal" style="border:none;background:transparent;border-radius:50%;"><img src="./assets/images/rename.svg"> Rename file</button></li>
                                <li class="list-group-item"><button onclick="duplicateFile('${i}')" style="border:none;background:transparent;border-radius:50%;"><img src="./assets/images/duplicate.svg"> Duplicate file</button></li>
                                <li class="list-group-item"><button onclick="deleteFile('${i}')" data-bs-toggle="modal" data-bs-target="#deleteFileModal" style="border:none;background:transparent;border-radius:50%;color:#D33852;"><img src="./assets/images/delete.svg"> Delete file</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            files = files + file;
            l++;
        }
    }
    file_space.innerHTML = files;
    file_counter.textContent = l;
    file_counter2.textContent = l;
}






// Disabling Create Folder and Create file button while input is empty...........................................................................................
function createFolderBtnStyler() {
    if (create_folder_input.value == "") {
        create_folder_button.classList.add("btn_add_disabled");
        create_folder_button.disabled = true;
    } else {
        create_folder_button.classList.remove("btn_add_disabled");
        create_folder_button.disabled = false;
    }
}

function createFileBtnStyler() {
    console.log(create_file_input.value)
    if (create_file_input.value == "") {
        create_file_button.classList.add("btn_add_disabled");
        create_file_button.disabled = true;
    } else {
        create_file_button.classList.remove("btn_add_disabled");
        create_file_button.disabled = false;
    }
}





renderFolders();
renderFiles();