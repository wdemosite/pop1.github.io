import { AppMockKaipoke } from "./src/AppMockKaipoke.js";

console.log("Mock.js: loaded");
const app = new AppMockKaipoke();

app.mount();

// ボタンにイベントをつける
const dataClear = () => {
    localStorage.clear();
    window.location.reload();
}
document.querySelector('.edit-meny').addEventListener('click', dataClear, false);
