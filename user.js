
const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userIdNum = urlParams.get(`user_id`);
const userProfileElement = document.querySelector(`#user-profile`);
const userPostsElement = document.querySelector(`#user-posts`);
const userAlbumsElement = document.querySelector(`#user-albums`);

async function getUserById (userId) {
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const userData = await userRes.json()
    return userData
};
async function getPostsByUserId (userId) {
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const postsData = await postsRes.json()
    return postsData
};
async function getAlbumsByUserId (userId) {
    const albumRes = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    const albumData = await albumRes.json()
    return albumData
};

async function renderUser() {
    const user = await getUserById(userIdNum);
    const userPosts = await getPostsByUserId(userIdNum);
    const userAlbums = await getAlbumsByUserId(userIdNum);
    
    const userProfile = document.createElement(`div`);
    const userFullName = document.createElement(`p`);
    const userNickName = document.createElement(`p`);
    const userEmail = document.createElement(`p`);
    const userPhone = document.createElement(`p`);
    const userWeb = document.createElement(`p`);
    const userCompany = document.createElement(`p`);
    const userAddress = document.createElement(`span`);
    const userAddressLink = document.createElement(`a`);
    const mapLan = user.address.geo.lat;
    const mapLng = user.address.geo.lng;
    const postsWrapper = document.createElement(`div`);
    const albumsWrapper = document.createElement(`div`);

    userFullName.textContent = `Full name: ${user.name}`;
    userNickName.textContent = `Nick name: ${user.username}`;
    userEmail.textContent = `Email: ${user.email}`;
    userPhone.textContent = `Phone: ${user.phone}`;
    userWeb.textContent = `Web page: ${user.website}`;
    userCompany.textContent = `Company name: ${user.company.name}`;
    userAddress.textContent = `Address: `;
    userAddressLink.textContent = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}.`;
    userAddressLink.href = `http://maps.google.com/maps?q=${mapLan},${mapLng}`;
    userAddressLink.target = `_blank`;


    userPosts.map(post=> {
        let postEl = document.createElement(`p`);
        let postSpan = document.createElement(`span`);
        let postLink = document.createElement(`a`);
        postEl.textContent = `${post.body}. `;
        postLink.href = `./post.html?post_id=${post.id}`;
        postLink.textContent = `Go to post`;

        postsWrapper.append(postEl);
        postEl.append(postSpan);
        postSpan.after(postLink);
    })
    userAlbums.map(album => {
        let albumEl = document.createElement(`p`);
        let albumSpan = document.createElement(`span`);
        let albumLink = document.createElement(`a`);
        albumEl.textContent = `${album.title} `;
        albumLink.href = `./album.html?album_id=${album.id}`;
        albumLink.textContent = `About album`;

        albumsWrapper.append(albumEl);
        albumEl.append(albumSpan);
        albumSpan.after(albumLink);
    })

    userProfileElement.append(userProfile);
    userProfile.append(userFullName, userNickName, userEmail, userPhone, userWeb, userCompany, userAddress);
    userPostsElement.append(postsWrapper);
    userAlbumsElement.append(albumsWrapper);
    userAddress.append(userAddressLink);
};
renderUser();


