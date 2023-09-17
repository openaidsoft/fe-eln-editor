// Network error => 마지막 노트 변경 사항을 localStorage에 저장
export function saveLocalStorage(block) {
  localStorage.setItem("tempBlock", "message");
}

export function getLocalStorage() {
  const storageItem = localStorage.getItem("tempBlock");
  console.log(storageItem);
  if (typeof storageItem == Object) {
    const content = JSON.parse(storageItem);
    console.log(content);
  }
  return storageItem;
}
