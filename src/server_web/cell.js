import fs from 'fs';

function extractCellParametersFromFile(filePath) {
    try {
        // 读取文件内容
        const cifContent = fs.readFileSync(filePath, 'utf-8');

        // 定义正则表达式模式来匹配晶胞参数
        const cellPattern = /_cell_length_a\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_length_b\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_length_c\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_angle_alpha\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_angle_beta\s+(\d+\.\d+).*?\n(?:.*?\n){0,5}.*?_cell_angle_gamma\s+(\d+\.\d+)/;

        // 使用正则表达式匹配晶胞参数
        const matches = cifContent.match(cellPattern);

        if (matches && matches.length === 7) {
            // 提取匹配的参数
            const a = parseFloat(matches[1]);
            const b = parseFloat(matches[2]);
            const c = parseFloat(matches[3]);
            const alpha = parseFloat(matches[4]);
            const beta = parseFloat(matches[5]);
            const gamma = parseFloat(matches[6]);

            // 返回晶胞参数对象
            return { a, b, c, alpha, beta, gamma };
        } else {
            // 如果未找到匹配，返回空对象或者抛出错误，根据实际需求来决定
            return null;
        }
    } catch (error) {
        console.error('Error reading file:', error.message);
        return null;
    }
}

// 示例使用
const filePath = '../../public/data/mof/part1_8608/edq_v1-3c_B_Ch_v2-6c_Cr_1_Ch_1-3B_4H_Ch_1-2B_2F_Ch.cif';
const cellParameters = extractCellParametersFromFile(filePath);

if (cellParameters) {
    console.log(cellParameters.a);
} else {
    console.log('Failed to extract cell parameters from the file.');
}
