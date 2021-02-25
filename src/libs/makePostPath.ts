const slugify = require('@sindresorhus/slugify');

export const makePostPath = (series, title) => {
  // gatsby-node.js에서는 module.exports를 써도 작동을 안 해서 그냥 하드코딩해놓았으니
  // path 생성 방법을 바꾼다면 gatsby-node.js도 수정해야 한다.

  // 또한 post/index.tsx에서 routing을 해주므로 gatsby-mode.js와 달리 path를 return할 때
  // posts/를 빼준다.
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  const sluggedTitlte = korean.test(title) ? title : slugify(title)
  const sluggedSeries = series ? (korean.test(series) ? series : slugify(series) ) : null
  return series ? `${sluggedSeries}/${sluggedTitlte}` : sluggedTitlte
}