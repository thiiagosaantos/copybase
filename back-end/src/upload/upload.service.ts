import { Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import * as excel from 'exceljs';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor() { }

  async processCsvFile(fileBuffer: Buffer) {
    const stream = Readable.from(fileBuffer.toString());

    const metricsData = {
      mrr: {},
      churnRate: {}, 
    };

    return new Promise((resolve, reject) => {
      stream.pipe(csvParser())
        .on('data', (row) => {
          // Verifica se a assinatura está ativa e se possui valor
          if (row['status'] === 'Ativa' && row['valor']) {
            const value = parseFloat(row['valor'].replace(',', '.'));

            // Calcula o MRR para o mês atual
            const startDate = new Date(row['data início']);
            const month = startDate.getMonth() + 1;
            const year = startDate.getFullYear();
            const formattedMonthYear = `${month}/${year}`; 
            if (metricsData.mrr[formattedMonthYear]) {
              metricsData.mrr[formattedMonthYear] += value;
            } else {
              metricsData.mrr[formattedMonthYear] = value;
            }
          }

          if (row['status'] === 'Cancelada') {
            const cancellationDate = row['data cancelamento'];
            if (cancellationDate) {
              // Calcula a taxa de churn para o mês do cancelamento
              const formattedMonthYear = `${new Date(cancellationDate).getMonth() + 1}/${new Date(cancellationDate).getFullYear()}`;
              if (metricsData.churnRate[formattedMonthYear]) {
                metricsData.churnRate[formattedMonthYear]++;
              } else {
                metricsData.churnRate[formattedMonthYear] = 1;
              }
            }
          }
        })
        .on('end', () => {
          // Ordenar os objetos pelos meses
          const mrrSorted = sortObjectByMonth(metricsData.mrr);
          const churnRateSorted = sortObjectByMonth(metricsData.churnRate);
          resolve({ mrr: mrrSorted, churnRate: churnRateSorted });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  async processExcelFile(fileBuffer: Buffer) {

    const workbook = new excel.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.getWorksheet(1);
    const metricsData = {
      mrr: {},
      churnRate: {},
    };

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const status = row.getCell(4).value;
        const value = parseFloat(row.getCell(7).value.toString().replace(',', '.'));

        // Verifica se a assinatura está ativa e se possui valor
        if (status === 'Ativa' && value) {
          const startDateCellValue = row.getCell(3).value;
          const startDate = startDateCellValue instanceof Date ? startDateCellValue : new Date(startDateCellValue.toString());
          const month = startDate.getMonth() + 1 + '/' + startDate.getFullYear();

          // Calcula o MRR para o mês atual
          if (metricsData.mrr[month]) {
            metricsData.mrr[month] += value;
          } else {
            metricsData.mrr[month] = value;
          }
        }
        // Verifica se a assinatura foi cancelada
        const cancellationDateCellValue = row.getCell(6).value;
        if (status === 'Cancelada' && cancellationDateCellValue instanceof Date) {
          const cancellationDate = cancellationDateCellValue;
          const formattedMonthYear = `${cancellationDate.getMonth() + 1}/${cancellationDate.getFullYear()}`;

          // Incrementa a taxa de churn para o mês do cancelamento
          if (metricsData.churnRate[formattedMonthYear]) {
            metricsData.churnRate[formattedMonthYear]++;
          } else {
            metricsData.churnRate[formattedMonthYear] = 1;
          }
        }
      }
    });
    // Ordenar os objetos pelos meses
    const mrrSorted = sortObjectByMonth(metricsData.mrr);
    const churnRateSorted = sortObjectByMonth(metricsData.churnRate);
    return { mrr: mrrSorted, churnRate: churnRateSorted };
  }
}

// Função para ordenar objetos pelos meses
function sortObjectByMonth(obj) {
  return Object.fromEntries(
    Object.entries(obj).sort((a, b) => {
      const [monthA, yearA] = a[0].split('/').map(Number);
      const [monthB, yearB] = b[0].split('/').map(Number);
      return yearA - yearB || monthA - monthB;
    })
  );
}
