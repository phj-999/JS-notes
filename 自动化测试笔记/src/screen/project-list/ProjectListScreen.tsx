import React from 'react'
import styled from '@emotion/styled';

export const ProjectListScreen = () => {

    return (
        <Container>
            <Row marginBottom={2} between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding
                    type={"link"}
                    onClick={open}
                >创建项目</ButtonNoPadding>
            </Row>

            <SearchPanel users={users || []} param={param} setParam={setParam} />
            <ErrorBox error={error}/>
            <List loading={isLoading} dataSource={list || []} users={users || []} />
        </Container>
    )
}


const Container = styled.div `
   padding:3.2rem
`
