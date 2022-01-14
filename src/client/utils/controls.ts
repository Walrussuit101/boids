export const getController = (id: string) => {
    let controller = document.getElementById(id);
	if(!controller){
		throw new Error("#"+id+" controller element not in document")
	}

    return controller;
}