/**
 * Get an HTMLElement based on Id and throw error 
 * if not present in document
 * 
 * @param id Id of HTMLElement to get
 * @throws When element not in document
 * @returns HTMLElement
 */
export const getController = (id: string) => {
    let controller = document.getElementById(id);
	if(!controller){
		throw new Error("#"+id+" controller element not in document")
	}

    return controller;
}