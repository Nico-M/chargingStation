import { Component } from "vue";

declare module "vue3-scroll-seamless" {

    export interface ClassOptions {
        /**
         * The number of items to move at once
         */
        limitMoveNum?: number;
        /**
         * The height of each single item in pixels
         */
        singleHeight?: number;
        /**
         * The width of each single item in pixels
         */
        singleWidth?: number;
        /**
         * Custom class names
         */
        className?: string;
        /**
         * Custom hover class name
         */
        hoverClassName?: string;
    }

    export interface ScrollOptions {
        /**
         * Direction of scroll: up, down, left, right
         */
        direction?: "up" | "down" | "left" | "right";
        /**
         * Scroll speed, higher value = faster scroll
         */
        step?: number;
        /**
         * Whether to enable hover to pause
         */
        hoverStop?: boolean;
        /**
         * List data
         */
        data?: any[];
        /**
         * Whether to listen for changes in the list data
         */
        dataWatcherPause?: boolean;
        /**
         * Whether to enable smooth transition animation
         */
        singleAnimation?: boolean;
        /**
         * Animation duration in milliseconds
         */
        delay?: number;
        /**
         * The number of copies of the list to keep the scroll seamless
         */
        copyNum?: number;
        /**
         * Whether to wait until the number of items is greater than the container before starting to scroll
         */
        waitForAnimation?: boolean;
        /**
         * CSS3 animation configuration
         */
        cssAnimation?: boolean;
    }

    export const vue3ScrollSeamless: DefineComponent<{
        dataList: any[];
        classOptions?: ClassOptions;
    }, {}, any>;
}