import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

export const Options = [
    {
        index:0,
        title:"Maior valor",
        value:"MaiorValor",
        icon:<ArrowUpwardIcon/>,
    },
    {
        index:1,
        title:"Menor valor",
        value:"MenorValor",
        icon:<ArrowDownwardIcon/>,
    },
    {
        index:2,
        title:"Cor",
        value:"Cor",
        icon:<ColorLensIcon/>,
    },
    {
        index:3,
        title:"Tamanho",
        value:"Tamanho",
        icon:<AspectRatioIcon/>,
    }
]