export function getStarIcon(average_score: number, i: number) {
    if (average_score >= i + 1) {
      return "/assets/material-symbols_star-rounded.svg" // 꽉 찬 별
    } else if (average_score >= i + 0.5) {
      return "/assets/uim_star-half-alt.svg" // 반만 찬 별
    } else {
      return "/assets/material-symbols_star-emptyrounded.svg" // 빈 별
    }
}