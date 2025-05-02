export function updateProgress(
  easyTotal,
  easySolved,
  mediumTotal,
  mediumSolved,
  hardTotal,
  hardSolved,
  extremeTotal,
  extremeSolved
) {
  const progressData = [
    { id: "easyProgress", solved: easySolved, total: easyTotal },
    { id: "mediumProgress", solved: mediumSolved, total: mediumTotal },
    { id: "hardProgress", solved: hardSolved, total: hardTotal },
    { id: "extremeProgress", solved: extremeSolved, total: extremeTotal },
  ];

  let grandSolved = 0,
    grandTotal = 0;

  progressData.forEach(({ id, solved, total }) => {
    const percent = total === 0 ? 0 : Math.round((solved / total) * 100);
    const fill = document.querySelector(`#${id} .bar-fill`);
    const fillPercent = document.querySelector(`#${id} .bar-fill span`);
    const count = document.querySelector(`#${id} .count`);
    fill.style.width = `${percent}%`;
    fillPercent.textContent = `${percent}%`;
    count.textContent = `${solved} / ${total}`;
    grandSolved += solved;
    grandTotal += total;
  });

  // Total
  const totalPercent =
    grandTotal === 0 ? 0 : Math.round((grandSolved / grandTotal) * 100);
  const totalFill = document.querySelector(`#totalProgress .bar-fill`);
  const totalFillPercent = document.querySelector(
    `#totalProgress .bar-fill span`
  );
  const totalCount = document.querySelector(`#totalProgress .count`);
  totalFill.style.width = `${totalPercent}%`;
  totalFillPercent.textContent = `${totalPercent}%`;
  totalCount.textContent = `${grandSolved} / ${grandTotal}`;
}

// Example usage
updateProgress(50, 30, 100, 60, 80, 20, 70, 10);
