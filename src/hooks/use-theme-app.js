export function useThemeApp(fontSize, color){

    return{
        color:{
            rosa:'#fa93be'
        },
        configFont: {
            fontSize: fontSize ?? 14,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            fontWeight: 600,
            color:color ?? 'rgb(255, 255, 255)'
        },
        configFontDark: {
            fontSize: fontSize ?? 14,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            fontWeight: 600,
            color: color ??'rgb(241, 99, 210)'
        }
    }
}