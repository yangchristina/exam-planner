import { keyframes, styled } from "@/stitches.config";

export const animateTransition =  {
    from: {
        scale: 0,
        opacity: 0,
    },
    enter: {
        scale: 1,
        opacity: 1,
    },
    leave: {
        scale: 0,
        opacity: 0,
    },
}

export const overlayStyle = {
    backgroundColor: '$overlay7',
    inset: 0,
    zIndex: 100,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    pointerEvents: 'all',
    placeItems: 'center',
    overflowY: 'auto',
}

export const contentStyle = {
    position: 'relative',
    backgroundColor: '$primary2',
    borderRadius: 6,
    border: '$border',
    borderColor: `$primary7`,
    boxShadow: '$colors$gray7 0px 2px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    size: 'max-content',
    // maxHeight: '90vh',
    // maxWidth: '95vw',
    // overflow: 'auto', // TODO: only scroll if maxHeight too large. Can i make portal or page scrollable instead?
    padding: 30,
    zIndex: 100,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    '&:focus': { outline: 'none' },

    variants: {
        hasPadding: {
            false: {
                padding: 0,
            }
        }
    }
}

export const titleStyle = {
    margin: 0,
    color: '$primary11',
    fontSize: 'x-large',
    letterSpacing: 1,
    fontWeight: 500,
    alignSelf: 'center',
};

export const descriptionStyle = {
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 1.5,
    letterSpacing: 0.6,
};

export const ButtonBar = styled('div', {
    display: 'flex',
    justifyContent: 'flex-end', 
    flexWrap: 'nowrap', 
    gap: 15,
})