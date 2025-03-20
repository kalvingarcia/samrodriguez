import {Children, cloneElement, useEffect, useRef, useState} from "react";

const ENTER_EXIT_ERROR_MESSAGE = "Both enter and exit props need to be defined";
const DEFAULT_ANIMATION_DURATION = 300;

/**
 * A wrapper component that animates the child component using CSS classes. The animation uses “events,”
 * which are triggered by timeout functions. If there shouldn't be an enter or exit animation,
 * set the prop to "none". This component will always mount and unmount the child. To keep the child
 * mounted even when not shown, use the Effect component.
 * 
 * @param props The Transition takes 5 props:
 *  *   The `show` prop defines whether the component should be rendered. *Defaults to false.*
 *  *   The `enter` and `exit` props define the class names that apply the CSS animations they 
 *      perform. **These props is required.**
 *  *   The `duration` prop is used to define how long the animation will take in terms of milliseconds. 
 *      *Defaults to 300ms*
 *  *   The `children` prop should only have 1 child. **This prop is required.**
 * @returns The child React component when `show` is true.
 */
export default function Transition({show = false, enter, exit, duration = DEFAULT_ANIMATION_DURATION, children, __DELAY = 0}) {
    // Testing that enter and exit are defined.
    if(!enter || !exit)
        throw new Error(ENTER_EXIT_ERROR_MESSAGE); // Throwing an error to inform that enter or exit or both are undefined.

    const [render, setRender] = useState(enter === "none"? true : false); // Defines whether to render the child or not.
    const [_, setState] = useState("inactive");
    const queue = useRef([]);
    useEffect(() => {
        // Testing the cases of show and hide (mount and unmount).
        if(show && !render) {
            setState("enter"); // Updating the child to animated one.
            setTimeout(() => setRender(true) || queue.current.push(enter), __DELAY);
            setTimeout(() =>  setState("active") || queue.current.shift(), duration + __DELAY); // After the animation duration is over, we reset the child.
        } else if(!show && render) {
            setState("exit"); // Updating the child to the animated one.
            queue.current.push(exit);
            setTimeout(() => setRender(false) || queue.current.shift(), duration); // After the animation, we unmount and reset the child.
        }
    }, [show, render, duration]);

    const child = Children.only(children); // Assert that the child is an only child.
    return render && cloneElement(child, { 
        className: [ 
            child.props.className?? "",
            ...queue.current
        ].join(" ")
    });
}