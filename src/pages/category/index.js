import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import {
    Card,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemText,
    SvgIcon
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { themeCores } from '../../theme/colors'

export const Page = () => {

    const route = useRouter();
    const [categories, setCategories] = useState([])
    const api = useApi();

    useEffect(() => {
        const init = async () => {
            const response = await api.get("lista-categorias")
            if (response) {
                setCategories(response)
            }
        }

        init();
    }, [])

    return (
        <Card
            sx={{
                width: '90%',
                margin: '20px'
            }}
        >
            <CardHeader title="Categorias" sx={{
                color: themeCores.rosa
            }} />
            <List>
                {categories.map((categorie, index) => {
                    const hasDivider = index < categories.length - 1;
                    return (
                        <ListItem
                            divider={hasDivider}
                            key={categorie.id}
                        >
                            <ListItemText
                                primary={`Descrição : ${categorie.descricao}`}
                                primaryTypographyProps={{ variant: 'subtitle1' }}
                            />
                            <IconButton edge="end"
                                onClick={() => route.push(`/category/${categorie?.id}`)}
                            >
                                <SvgIcon>
                                    <NavigateNextIcon/>
                                </SvgIcon>
                            </IconButton>
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;