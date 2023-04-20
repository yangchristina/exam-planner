import * as SliderPrimitive from '@radix-ui/react-slider';
import { styled } from '@/stitches.config';
import * as ProgressPrimitive from '@radix-ui/react-progress';

const SlidersWrapper = styled('section', {
    position: 'relative',
    width: 200,
})

const Flex = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    marginRight: '25%',
})

const ItemProgress = ({ progress, width }: { progress: number, width?: string | number }) => {

    return (
        <SlidersWrapper css={{ ...(width !== undefined && { width }) }} >
            <Flex>
                <label>Progress</label>
                {/* <Image
                    style={{ top: 5, right: '0' }}
                    width={70} height={40}
                    src={'/tinyPanda.png'}
                /> */}
            </Flex>

            <Progress value={progress} css={{ width: '100%' }}>
                <ProgressIndicator style={{ transform: `translateX(-${100 - progress}%)` }} />
            </Progress>
        </SlidersWrapper>
    );
}

export default ItemProgress

const HEIGHT = '2rem'

const StyledProgress = styled(ProgressPrimitive.Root, {
    position: 'relative',
    overflow: 'hidden',
    background: '$overlay9',
    // borderRadius: '99999px',
    // width: 300,

    width: 200,
    height: HEIGHT,

    backgroundColor: '$gray1',
    borderRadius: 5,
    border: '$borderThin',

    // Fix overflow clipping in Safari
    // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
    transform: 'translateZ(0)',
});

const StyledIndicator = styled(ProgressPrimitive.Indicator, {
    // backgroundColor: 'white',
    width: '100%',
    height: '100%',
    transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',

    // position: 'absolute',
    backgroundColor: '$primary4', // TODO: what number?
    // borderRadius: 0,
    // borderTopLeftRadius: 'inherit',
    // borderBottomLeftRadius: 'inherit',
    // height: '100%',
});

// Exports
export const Progress = StyledProgress;
export const ProgressIndicator = StyledIndicator;





// !!! not in use
const goalSliderGrabHeight = 0
const GoalSlider = styled(SliderPrimitive.Root, {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
    width: '100%',
    zIndex: 1,

    '&[data-orientation="horizontal"]': {
        height: goalSliderGrabHeight,
    },

    '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        width: goalSliderGrabHeight,
        height: 100,
    },
});

const GoalTrack = styled(SliderPrimitive.Track, {
    // display: 'none',
    backgroundColor: '$overlay10',
    position: 'relative',
    flexGrow: 1,
    borderRadius: '9999px',

    '&[data-orientation="horizontal"]': { height: 0 },
    '&[data-orientation="vertical"]': { width: 0 },
});

const GoalRange = styled(SliderPrimitive.Range, {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: '9999px',
    height: '100%',
});

const ThumbWrapper = styled('div', {
    color: 'red',
})

const GoalThumb = styled(SliderPrimitive.Thumb, {
    all: 'unset',
    display: 'block',
    color: 'red',
    flexGeneral: 'column',
});

const GoalText = styled('label', {
    position: 'absolute',
    fontSize: '$1',
    center: 'row',
    whiteSpace: 'nowrap',
    top: '1rem',
})