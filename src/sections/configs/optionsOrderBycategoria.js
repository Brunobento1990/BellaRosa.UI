import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

export const Options = [
    {
        valorIndex:1,
        title:"maior valor",
        value:"MaiorValor",
        icon:<ArrowUpwardIcon/>,
    },
    {
        valorIndex:2,
        title:"menor valor",
        value:"MenorValor",
        icon:<ArrowDownwardIcon/>,
    },
    {
        valorIndex:3,
        title:"cor",
        value:"Cor",
        icon:<ColorLensIcon/>,
    },
    {
        valorIndex:4,
        title:"tamanho",
        value:"Tamanho",
        icon:<AspectRatioIcon/>,
    }
]