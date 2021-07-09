import React from 'react'
import {
    FlexBox,
    Heading,
    Progress,
    Appear,
    Slide,
    Deck,
    Text,
    Grid,
    Box,
    CodePane,
    MarkdownSlide,
    Image,
} from 'spectacle'
import styled from 'styled-components'

const CustomDeck = styled(Deck)`
position: inherit !important;
`
const transition = {
    from: { transform: 'scale(0.5) rotate(45deg)', opacity: 0 },
    enter: { transform: 'scale(1) rotate(0)', opacity: 1 },
    leave: { transform: 'scale(0.2) rotate(315deg)', opacity: 0 }
}

const theme = {
}

const template = () => {
    return <FlexBox justifyContent="center" position="absolute" bottom={0} width={1}>
        <Box padding="1em">
            <Progress />
        </Box>
    </FlexBox>
}

// SPECTACLE_CLI_TEMPLATE_END

const SlideFragments = () => {
    return <Slide>
        <Text>This is also a slide fragment.</Text>
        <Appear>
            <Text>This item shows up!</Text>
        </Appear>
        <Appear>
            <Text>This item also shows up!</Text>
        </Appear>
    </Slide>
}

const Presentation = () => {

    return <CustomDeck theme={theme} template={template}>
        <Slide>
            <FlexBox height="100%" flexDirection="column">
                <Heading margin="0px" fontSize="150px">✨<i>Spectacle</i> ✨</Heading>
                <Appear>
                    <Heading margin="0px" fontSize="h2" > A ReactJS Presentation Library</Heading>
                </Appear>
                <Appear>
                    <Heading margin="0px 32px" color="primary" fontSize="h3">Where you can write your decks in JSX, Markdown, or MDX!</Heading>
                </Appear>
            </FlexBox >
        </Slide >
        <Slide transition={transition}>
            <Appear>
                <Image src='https://github.com/FormidableLabs/dogs/blob/main/src/beau.jpg?raw=true' width={800} />
            </Appear>
        </Slide >
        <Slide>
            <FlexBox>
                <Text>These</Text>
                <Text>Text</Text>
                <Text color="secondary">Items</Text>
                <Text fontWeight="bold">Flex</Text>
            </FlexBox >
            <Grid gridTemplateColumns="1fr 2fr" gridColumnGap={15} >
                <Box backgroundColor="primary">
                    <Text color="secondary">Single-size Grid Item</Text>
                </Box >
                <Box backgroundColor="secondary">
                    <Text>Double-size Grid Item</Text>
                </Box>
            </Grid >
            <Grid gridTemplateColumns="1fr 1fr 1fr" gridTemplateRows="1fr 1fr 1fr" alignItems="center"
                justifyContent="center" gridRowGap={1} >
            </Grid >
        </Slide >
        <SlideFragments />
        <Slide>
            <CodePane language="jsx">
                {`
              import { createClient, Provider } from 'urql';
              const client = createClient({ url: 'https://0ufyz.sse.codesandbox.io' });
                const App = () => (
              <Provider value={client}>
                <Todos />
              </Provider>
              );
              `}
            </CodePane>
        </Slide >
        <Slide >
            <p><strong>Doanh nghiệp muốn thành công</strong>&nbsp;thì không thể chỉ dựa trên nỗ lực của một người mà đòi hỏi sự phấn đấu và hỗ trợ lẫn nhau của mọi thành viên trong tổ chức đó. Mặc dù vậy không ít nhà quản lý thường không tự tin khi giao việc cho nhân viên của mình, vì thế họ đã vơ vào hết mọi việc về mình và tự làm tất cả.</p><p>Như thế vô tình làm cho các nhân viên cảm thấy khó chịu, hay tự ti vì họ không có cơ hội để khẳng định và phát triển năng lực bản thân, mà theo&nbsp;<strong>sơ đồ Maslow</strong>&nbsp;đó là một nhu cầu thiết yếu của con người. Do đó, vì lợi ích cho công ty cũng như chính bạn, bạn cần trở thành một người chủ biết phân công công việc cho nhân viên một cách khôn ngoan.</p><p>Tuy nhiên thực tế là phần lớn các lãnh đạo, các cấp quản lý tại Việt Nam chưa được đào tạo bài bản và chuyên sâu, những kỹ năng mà họ có được phần nhiều từ những kinh nghiệm và va vấp trong thương trường mà họ đúc kết được. Vì vậy, nhiều nhà quản lý vẫn không biết cách, hoặc gặp sai lầm trong việc phân bổ để thực hiện công việc,&nbsp;</p><p><strong>làm lãng phí thời gian</strong>&nbsp;và nguồn lực của chính họ cũng như công ty.</p><p>Nhận thức được nhu cầu và vai trò của quản lý trong doanh nghiệp,&nbsp;</p><p>Ky<strong>na.vn</strong></p><p>&nbsp;và&nbsp;</p><p><a href="https://kyna.vn/giang-vien/phan-van-son/429676" rel="noopener noreferrer" target="_blank"><strong>giảng viên Phan Văn Sơn</strong></a>&nbsp;đã đồng hành phát triển khóa học “<strong>Kỹ năng phân công và ủy thác công việc</strong>” nhằm xây dựng được các kỹ năng cần thiết và nâng cao vai trò quản trị của nhà quản lý trong doanh nghiệp.</p><p><br /></p><h4>K<strong>hóa học dành cho người đã đi làm, bao gồm:</strong></h4><h4><br /></h4><ul><li>Các cấp quản lý và lãnh đạo doanh nghiệp.</li><li>Đội ngũ quản lý cấp thấp và cấp trung trong các phòng ban của công ty.</li><li>Những người đang làm việc trong các doanh nghiệp muốn được hoàn thiện bản thân.</li><li>Đội ngũ phát triển nhân sự muốn được cập nhật kiến thức để huấn luyện cho nhân viên các cấp.</li></ul><p>Chỉ cần “đặt đúng người” vào “đúng vị trí” là bạn đã nắm được 50% thành công, 50% còn lại sẽ phụ thuộc vào nỗ lực của “người được giao việc”. Mặt khác, nếu người quản lý “<strong>không đặt đúng người</strong>” và “<strong>không giao đúng việc</strong>” thì 99% công việc sẽ thất bại.</p><p>Hãy tham gia khóa học tại&nbsp;<strong>Kyna.vn</strong>&nbsp;để biết cách phân bổ công việc và tận dụng nguồn lực cho hiệu quả công việc vượt trội bạn nhé!</p>
        </Slide >
        <MarkdownSlide componentProps={{ color: 'yellow' }}>
            {`
      # This is a Markdown Slide
      - You can pass props down to all elements on the slide.
      - Just use the \`componentProps\` prop.
      `}
        </MarkdownSlide >
    </CustomDeck >
}

export default Presentation