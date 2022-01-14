import Two, { ConstructionParams } from "twojs-ts";

/**
 * Init twojs on a HTMLElement
 * Also add an event listener to resize twojs as the window does
 * 
 * @param field HTMLElement to attach twojs to
 * @returns Two
 */
export const initTwojs = (field: HTMLElement): Two => {
    let fieldStyles = getComputedStyle(field);
    let twojsParams: ConstructionParams = {height: parseInt(fieldStyles.height), width: parseInt(fieldStyles.width)};
    let two = new Two(twojsParams).appendTo(field);

    window.addEventListener("resize", () => {
        resize(field, two);
    });

    return two;
}

/**
 * Match the twojs instance's height/width with the recomputed field's height/width
 * 
 * @param field HTML Element to match size of
 * @param two Two instance
 */
const resize = (field: HTMLElement, two: Two) => {
    let fieldStyles = getComputedStyle(field);
    two.height = parseInt(fieldStyles.height);
    two.width = parseInt(fieldStyles.width);
}