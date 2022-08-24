import React, { useContext, useRef, useLayoutEffect } from 'react'
import { Stack, Button, Group, Text, TypographyStylesProvider, Divider } from '@mantine/core';
import StockChart from './StockChart';
import { CompanySummary } from '../api/FinanceApi';
import { useEffect, useState } from 'react';
import { CardContext } from '../pages/daylimit/CardData';
import CommentTab from './CommentTab';
import { useCallback } from 'react';

function CompanyInfo() {

  const data = useContext(CardContext)
  const [htmlwidth, setHtmlwidth] = useState('')
  const [summary, setSummary] = useState('')
  const modalRef = useRef(null)


  const onSize = () => {
    const { clientHeight, clientWidth } = modalRef.current
    setHtmlwidth(clientWidth)
  };

  useEffect(() => {
    CompanySummary({ 'symbol': data.代码 }).then(res => {
      let temp = res.data
      temp = temp.replace('<p>', '').replace('</p>', '')
      setSummary(temp)
    })
    setHtmlwidth(modalRef.current.clientWidth)
    window.addEventListener("resize", onSize);
  }, [])

  return (
    <div ref={modalRef}>
      <Stack justify="flex-start" >
        <Text lineClamp={4}>
          <TypographyStylesProvider>
            {summary}
          </TypographyStylesProvider>
        </Text>
        <Divider />
        {/* <StockChart symbol={data.代码} /> */}
        <CommentTab parentWidth={htmlwidth} />
      </Stack>
    </div>
  )
}

export default CompanyInfo