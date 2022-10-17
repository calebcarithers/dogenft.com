export const getDonars = () => {
  return fetch("https://staging.api.ownthedoge.com/v1/config").then(res => res.json())
}