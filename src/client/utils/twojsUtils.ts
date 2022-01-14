import Two, { ConstructionParams } from "twojs-ts";

export const initTwojs = (field: HTMLElement): Two => {
    let fieldStyles = getComputedStyle(field);
    let twojsParams: ConstructionParams = {height: parseInt(fieldStyles.height), width: parseInt(fieldStyles.width)};
    let two = new Two(twojsParams).appendTo(field);

    window.addEventListener("resize", () => {
        resize(field, two);
    });

    return two;
}

const resize = (field: HTMLElement, two: Two) => {
    let fieldStyles = getComputedStyle(field);
    two.height = parseInt(fieldStyles.height);
    two.width = parseInt(fieldStyles.width);
}