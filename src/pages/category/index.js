import { useEffect, useState } from 'react';
import { useApi } from 'src/hooks/use-api';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    SvgIcon
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Page = () => {

    const [categories, setCategories] = useState([])
    const api = useApi();

    useEffect(() => {
        const init = async () => {
            const response = await api.get("lista-categorias")
            console.log(response)
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
            <CardHeader title="Categorias" />
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
                                secondaryTypographyProps={{ variant: 'body2' }}
                            />
                            <IconButton edge="end">
                                <SvgIcon>
                                    <NavigateNextIcon />
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