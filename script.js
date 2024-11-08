let memberBooks = [];
let memberId = 1;
let editId = null;

function addMemberBook() {
  const memberName = document.getElementById('memberName').value;
  const npm = document.getElementById('npm').value;
  const bookTitle = document.getElementById('bookTitle').value;
  const phoneNumber = document.getElementById('phoneNumber').value;

  if (memberName === "" || npm === "" || bookTitle === "" || phoneNumber === "") {
    alert("Mohon isi semua bidang!");
    return;
  }

  if (editId === null) {
    memberBooks.push({
      id: memberId++,
      name: memberName,
      npm: npm,
      book: bookTitle,
      phone: phoneNumber,
    });
  } else {
    const memberBook = memberBooks.find(mb => mb.id === editId);
    memberBook.name = memberName;
    memberBook.npm = npm; // Pastikan NPM ikut diubah saat edit
    memberBook.book = bookTitle;
    memberBook.phone = phoneNumber;
    editId = null;
    document.getElementById('addButton').innerText = "Tambah";
  }

  document.getElementById('memberName').value = '';
  document.getElementById('npm').value = ''; // Reset input NPM
  document.getElementById('bookTitle').value = '';
  document.getElementById('phoneNumber').value = '';
  renderTable();
}

function renderTable() {
  const memberBookList = document.getElementById('memberBookList');
  memberBookList.innerHTML = "";

  memberBooks.forEach((memberBook, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${memberBook.name}</td>
    <td>${memberBook.book}</td>
    <td>${memberBook.phone}</td>
    <td>${memberBook.npm}</td>
    <td>
      <button onclick="editMemberBook(${memberBook.id})">Edit</button>
      <button onclick="deleteMemberBook(${memberBook.id})">Hapus</button>
    </td>
  `;
    memberBookList.appendChild(row);
  });
}

function deleteMemberBook(id) {
  memberBooks = memberBooks.filter(memberBook => memberBook.id !== id);
  renderTable();
}

function editMemberBook(id) {
  const memberBook = memberBooks.find(mb => mb.id === id);
  document.getElementById('memberName').value = memberBook.name;
  document.getElementById('npm').value = memberBook.npm; // Ambil nilai NPM
  document.getElementById('bookTitle').value = memberBook.book;
  document.getElementById('phoneNumber').value = memberBook.phone;
  editId = id;
  document.getElementById('addButton').innerText = "Simpan Perubahan";
}
