export class LoaderRenderer {

    private static loaderContainer: HTMLElement | null;
    private static loadingAnimation: HTMLElement | null;
    private static errorTextNode: HTMLElement | null;

    public static showLoading() {
        this.showLoadingAnimation();
        this.showElement(this.getLoaderBox());
    }

    public static hideLoading() {
        this.hideElement(this.getLoaderBox());
    }

    public static showErrorMessage(msg: string) {
        this.hideLoadingAnimation();
        this.getErrorTextNode().innerText = msg;
        this.showElement(this.getErrorTextNode())
    }

    private static showLoadingAnimation() {
        this.showElement(this.getLoadingAnimation())
    }

    private static hideLoadingAnimation() {
        this.hideElement(this.getLoadingAnimation())
    }

    private static showElement(element: HTMLElement) {
        element.style.display = "block";
    }

    private static hideElement(element: HTMLElement) {
        element.style.display = "none";
    }

    private static getLoaderBox(): HTMLElement {
        if (!this.loaderContainer) {
            this.loaderContainer = document.getElementById("loader-container");
        }
        if (!this.loaderContainer) {
            throw new Error("Couldn't find loader container node");
        }
        return this.loaderContainer;
    }

    private static getLoadingAnimation(): HTMLElement {
        if (!this.loadingAnimation) {
            this.loadingAnimation = document.getElementById("loading-animation");
        }
        if (!this.loadingAnimation) {
            throw new Error("Couldn't find loading animation node");
        }
        return this.loadingAnimation;
    }

    private static getErrorTextNode(): HTMLElement {
        if (!this.errorTextNode) {
            this.errorTextNode = document.getElementById("error-text");
        }
        if (!this.errorTextNode) {
            throw new Error("Couldn't find error text node");
        }
        return this.errorTextNode;
    }
}