"use client"
import {tss} from './theme';
import useContainer from './hooks/container';
import useRippleEffect from './hooks/ripple';
import {Icon} from './iconography';
import {Label} from './typography';

// Button styles.
const useStyles = tss.create(({theme, role, appearance, containerRole, rippleClass}) => ({
    button: {
        outline: "none",
        border: appearance === "outlined"? `1pt solid ${theme[role].onContainer.hex()}` : "none",
        fontWeight: "bold",

        minWidth: "fit-content",
        minHeight: "fit-content",
        maxWidth: "fit-content",
        maxHeight: "fit-content",
        position: "relative",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 2000px)",
        padding: "10px 20px",
        borderRadius: 2000,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,

        backgroundColor: appearance === "text" || appearance === "outlined"? "transparent" : theme[role][appearance === "filled"? "accent" : "container"].hex(),
        "&::after": {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            backgroundColor: appearance === "text" || appearance === "outlined"? theme[containerRole].onContainer.hex() : theme[role][appearance === "filled"? "onAccent" : "onContainer"].hex(),
            opacity: 0,
            transition: "opacity 300ms ease"
        },
        "&:hover::after": {
            opacity: 0.2
        },
        [`& .${rippleClass}`]: {
            backgroundColor: appearance === "text" || appearance === "outlined"? theme[containerRole].onContainer.hex() : theme[role][appearance === "filled"? "onAccent" : "onContainer"].hex()
        },
        "& > *": {
            textWrap: "nowrap"
        }
    }
}));

/**
 * The Button component is used in place of all the regular `button` html elements.
 * It is a styled version with a ripple effect. It also has a container provider to
 * allow the text or icons inside to query what type of button they're inside of.
 *
 * @param props The component takes 6 props:
 *  *   The `className` prop is available to add extra styles to the button, but
 *      not necessary to the functionality.
 *  *   The `role` prop is used to assign the color role of the button. *Defaults
 *      to primary.*
 *  *   The `appearance` prop is used to define which appearance the button takes
 *      on. The options are "filled", "tonal", "outlined", and "text". *Defaults to
 *      filled.*
 *  *   The `onMouseDown` and `onMouseUp` mouse events are available to add extra
 *      callbacks to the events besides the ripple effect.
 *  *   The `children` prop is required to add text and an icon if wanted. For best results
 *      add only 1 icon with text.
 *
 * The component also passes forward other props.
 *
 * @returns A styled `button` jsx element.
 */
export default function Button({className, role = "primary", appearance = "filled", icon, onMouseDown, onMouseUp, children, ...props}) {
    // Here we assign the container type depending on the appearance given.
    const {containerContext, Container} = useContainer();
    const {role: containerRole, type: containerType} = containerContext(); // We also request the parent container's role for text and outlined buttons.
    const type = appearance === "filled"? "accent" : appearance === "tonal"? "container" : containerType;

    // We obtain the ripple effect handler.
    const {rippleClass, rippleExpand, rippleFade} = useRippleEffect();
    // Create handlers that apply both the ripple event.
    // They also call the mouse events provided by the user
    // if they exist.
    const mouseDownHandler = event => {
        rippleExpand(event);
        onMouseDown?.(event);
    };
    const mouseUpHandler = event => {
        rippleFade(event);
        onMouseUp?.(event);
    };

    const {cx, classes} = useStyles({role, appearance, containerRole, rippleClass});
    return (
        <Container role={role} type={type}>
            <button className={cx(classes.button, className?? "")} onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} {...props}>
                {icon && <Icon icon={icon} __IS_IN_BUTTON={true} />}
                <Label>{children}</Label>
            </button>
        </Container>
    );
}
